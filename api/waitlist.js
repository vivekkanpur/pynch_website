// Waitlist API Handler
import { Resend } from 'resend';
import { generateCouponCode, generateReferralCode } from './utils/generateCodes.js';
import postgres from 'postgres';


/**
 * Send an immediate WhatsApp message via the Meta Business Cloud API.
 * Uses a free-form text message (works within the 24-hour customer-service window
 * that opens once the user contacts us, or via an approved utility template).
 *
 * NOTE: For the IMMEDIATE welcome message we try a text message first.
 * For the DAY-1 follow-up a separate template must be used (see send-discount.js).
 */
async function sendWhatsApp(formattedPhone, payload) {
  if (!process.env.META_WHATSAPP_TOKEN || !process.env.META_PHONE_NUMBER_ID) {
    console.log('Meta credentials missing. Skipping WhatsApp notification.');
    return;
  }

  const metaResponse = await fetch(
    `https://graph.facebook.com/v17.0/${process.env.META_PHONE_NUMBER_ID}/messages`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.META_WHATSAPP_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }
  );

  if (!metaResponse.ok) {
    const errorData = await metaResponse.json();
    console.error('Meta WhatsApp API Error:', errorData);
  }
}

/**
 * Format a phone number to E.164 (Indian default assumed for 10-digit numbers).
 */
function formatPhone(phone) {
  let formatted = phone.trim().replace(/\D/g, '');
  if (formatted.length === 10) formatted = '91' + formatted;
  return formatted;
}

/**
 * Schedule a Day-1 discount WhatsApp via Upstash QStash.
 * QStash will call /api/send-discount after the configured delay.
 */
async function scheduleDiscountMessage({ phone, name, couponCode, waitlistPosition }) {
  if (!process.env.QSTASH_TOKEN) {
    console.log('QSTASH_TOKEN missing. Skipping Day-1 discount scheduling.');
    return;
  }

  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'https://justpynch.com';

  const qstashEndpoint = process.env.QSTASH_URL
    ? `${process.env.QSTASH_URL}/v2/publish/json`
    : 'https://qstash.upstash.io/v2/publish/json';

  const response = await fetch(qstashEndpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.QSTASH_TOKEN}`,
      'Content-Type': 'application/json',
      // 86400 seconds = 24 hours. Set to "30" for testing.
      'Upstash-Delay': '86400s'
    },
    body: JSON.stringify({
      url: `${baseUrl}/api/send-discount`,
      body: { phone, name, couponCode, waitlistPosition }
    })
  });

  if (!response.ok) {
    const err = await response.json();
    console.error('QStash scheduling error:', err);
  } else {
    console.log('Day-1 discount message scheduled via QStash.');
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, moods, referredBy, turnstileToken } = req.body;

    // Lazy-init Neon so a missing POSTGRES_URL doesn't crash the module
    const sql = process.env.POSTGRES_URL ? postgres(process.env.POSTGRES_URL, { ssl: 'require' }) : null;

    // Lazy-init Resend
    const resend = new Resend(process.env.RESEND_API_KEY || 'dummy_key');

    // ── Verify Turnstile Token ───────────────────────────────────────────────
    if (!turnstileToken) {
      console.warn('No Turnstile token provided — skipping CAPTCHA check.');
    } else {

      const secretKey = process.env.TURNSTILE_SECRET_KEY;
      if (!secretKey) {
        console.warn('TURNSTILE_SECRET_KEY is missing. Skipping verification.');
      } else {
        const turnstileRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `secret=${encodeURIComponent(secretKey)}&response=${encodeURIComponent(turnstileToken)}`
        });
        const turnstileData = await turnstileRes.json();

        if (!turnstileData.success) {
          console.error('Turnstile verification failed:', turnstileData);
          return res.status(400).json({ error: 'CAPTCHA verification failed. Please try again.' });
        }
      }
    }

    // ── Generate unique codes ──────────────────────────────────────────────────
    const couponCode10 = generateCouponCode('PYNCH10');   // 10% off — sent Day-1
    const referralCode = generateReferralCode(name);       // Referral link code

    // ── Save to Vercel Postgres ──────────────────────────────────────────────
    let waitlistPosition = 2401; // default fallback
    let insertedId = null;
    let dbErrorMessage = null;

    if (!sql) {
      console.error('POSTGRES_URL is not set — skipping database save.');
    } else {
      try {
        const countResult = await sql`SELECT COUNT(*) as count FROM waitlist`;
        const count = parseInt(countResult[0]?.count || '0', 10);
        waitlistPosition = 2400 + count + 1;

        const insertResult = await sql`
          INSERT INTO waitlist (name, email, phone, moods, position, coupon_code_10, referral_code, referred_by)
          VALUES (${name || ''}, ${email || ''}, ${phone || ''}, ${moods || ''}, ${waitlistPosition}, ${couponCode10}, ${referralCode}, ${referredBy || null})
          RETURNING id
        `;
        insertedId = insertResult[0]?.id;
      } catch (dbError) {
        console.error('Postgres save error:', dbError);
        dbErrorMessage = dbError.message || String(dbError);
      }
    }

    // ── Handle referral: find referrer and store 5% coupon for new user ───────
    let couponCode5 = null;
    if (referredBy && sql) {
      try {
        const refRows = await sql`
          SELECT id FROM waitlist WHERE referral_code = ${referredBy} LIMIT 1
        `;

        if (refRows.length > 0) {
          couponCode5 = generateCouponCode('PYNCH5');

          if (insertedId) {
            await sql`
              UPDATE waitlist SET coupon_code_5 = ${couponCode5} WHERE id = ${insertedId}
            `;
          }
          console.log(`Referral match found for code "${referredBy}". 5% coupon: ${couponCode5}`);
        } else {
          console.log(`No referrer found for code "${referredBy}".`);
        }
      } catch (refError) {
        console.error('Referral lookup error:', refError);
      }
    }

    // ── Referral link for this new user ───────────────────────────────────────
    const referralLink = `https://justpynch.com/waitlist?ref=${referralCode}`;

    // ── 1. Email to the Owner (Internal Notification) ─────────────────────────
    try {
      const ownerResponse = await resend.emails.send({
        from: 'PYNCH System <waitlist@justpynch.com>',
        to: ['care@justpynch.com'],
        subject: `New Waitlist Signup: ${name}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px;">
            <h2>New Waitlist Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Moods:</strong> ${moods}</p>
            <p><strong>Waitlist Position:</strong> #${waitlistPosition}</p>
            <p><strong>10% Coupon (Day-1):</strong> ${couponCode10}</p>
            <p><strong>Referral Code:</strong> ${referralCode}</p>
            ${referredBy ? `<p><strong>Referred By:</strong> ${referredBy}</p>` : ''}
            ${couponCode5 ? `<p><strong>5% Referral Coupon Given:</strong> ${couponCode5}</p>` : ''}
          </div>
        `
      });
      if (ownerResponse.error) console.error('Owner email error:', ownerResponse.error);
    } catch (emailErr) {
      console.error('Owner email failed:', emailErr);
    }

    // ── 2. Email to the Customer (Autoresponder) ──────────────────────────────
    try {
      const customerResponse = await resend.emails.send({
        from: 'Tashu at PYNCH <care@justpynch.com>',
        to: [email],
        subject: 'You are on the list.',
        html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Inter:wght@300;400;600&display=swap');
          </style>
        </head>
        <body style="margin: 0; padding: 0; background-color: #F4F0EA;">
          <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #F4F0EA; padding: 40px 20px;">
            <tr>
              <td align="center">
                <!-- Main Container -->
                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; max-width: 600px; margin: 0 auto; box-shadow: 0 10px 40px rgba(0,0,0,0.05);">
                  <!-- Header -->
                  <tr>
                    <td align="center" style="padding: 50px 40px; background-color: #0C3839;">
                      <h1 style="margin: 0; font-family: 'Playfair Display', serif; font-size: 32px; color: #F4F0EA; font-weight: 400; letter-spacing: 0.1em; text-transform: uppercase;">PYNCH</h1>
                      <p style="margin: 15px 0 0 0; font-family: 'Inter', sans-serif; font-size: 10px; color: #CCFF00; text-transform: uppercase; letter-spacing: 0.3em;">Dress the person, not the performance</p>
                    </td>
                  </tr>
                  
                  <!-- Body Content -->
                  <tr>
                    <td style="padding: 50px 40px;">
                      <h2 style="margin: 0 0 30px 0; font-family: 'Playfair Display', serif; font-size: 28px; color: #1A1A1A; font-weight: 400; font-style: italic;">Welcome, ${name}.</h2>
                      
                      <p style="margin: 0 0 20px 0; font-family: 'Inter', sans-serif; font-size: 15px; color: #4A4A4A; line-height: 1.8; font-weight: 300;">You are officially on the waitlist. Your spot is <strong>#${waitlistPosition}</strong> in line. We are incredibly excited to share our world with you.</p>
                      
                      <p style="margin: 0 0 30px 0; font-family: 'Inter', sans-serif; font-size: 15px; color: #4A4A4A; line-height: 1.8; font-weight: 300;">We will reach out the moment we launch so you can claim your early access and your exclusive 20% off.</p>

                      ${couponCode5 ? `
                      <!-- Referral Bonus Block -->
                      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 30px 0; background-color: #F4F0EA; border-left: 3px solid #0C3839;">
                        <tr>
                          <td style="padding: 20px 24px;">
                            <p style="margin: 0 0 8px 0; font-family: 'Inter', sans-serif; font-size: 11px; color: #0C3839; font-weight: 600; text-transform: uppercase; letter-spacing: 0.15em;">🎁 Referral Bonus</p>
                            <p style="margin: 0 0 12px 0; font-family: 'Inter', sans-serif; font-size: 14px; color: #4A4A4A; line-height: 1.6;">A friend brought you here — and we love that. As a thank you, you get an additional <strong>5% off</strong> on launch day.</p>
                            <p style="margin: 0; font-family: 'Inter', sans-serif; font-size: 12px; color: #888;">Your code: <strong style="color: #0C3839; letter-spacing: 0.1em;">${couponCode5}</strong></p>
                          </td>
                        </tr>
                      </table>
                      ` : ''}

                      <!-- Referral Section -->
                      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 30px 0; background-color: #0C3839;">
                        <tr>
                          <td style="padding: 24px 28px;">
                            <p style="margin: 0 0 8px 0; font-family: 'Inter', sans-serif; font-size: 11px; color: #CCFF00; font-weight: 600; text-transform: uppercase; letter-spacing: 0.15em;">Share the Feeling</p>
                            <p style="margin: 0 0 16px 0; font-family: 'Inter', sans-serif; font-size: 14px; color: #F4F0EA; line-height: 1.6;">Know someone who dresses for themselves, not for anyone else? Share your link — your friend gets <strong>5% off</strong> when they join.</p>
                            <a href="${referralLink}" style="display: inline-block; background-color: #CCFF00; color: #0C3839; font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em; padding: 12px 24px; text-decoration: none;">Copy My Referral Link</a>
                            <p style="margin: 12px 0 0 0; font-family: 'Inter', sans-serif; font-size: 11px; color: #F4F0EA; opacity: 0.7; word-break: break-all;">${referralLink}</p>
                          </td>
                        </tr>
                      </table>
                      
                      <!-- Divider -->
                      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 40px 0;">
                        <tr><td height="1" style="background-color: #E5E5E5; line-height: 1px; font-size: 1px;">&nbsp;</td></tr>
                      </table>
                      
                      <p style="margin: 0 0 5px 0; font-family: 'Inter', sans-serif; font-size: 13px; color: #1A1A1A; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em;">Stay Moody,</p>
                      <p style="margin: 0; font-family: 'Playfair Display', serif; font-size: 18px; color: #0C3839; font-style: italic;">Tashu & The PYNCH Team</p>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td align="center" style="padding: 30px 40px; background-color: #F8F8F8; border-top: 1px solid #E5E5E5;">
                      <p style="margin: 0; font-family: 'Inter', sans-serif; font-size: 11px; color: #888888; letter-spacing: 0.05em;">&copy; 2026 PYNCH. All rights reserved.</p>
                      <p style="margin: 5px 0 0 0; font-family: 'Inter', sans-serif; font-size: 11px; color: #888888;">care@justpynch.com</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `
      });

      if (customerResponse.error) console.error('Customer email error:', customerResponse.error);
    } catch (emailErr) {
      console.error('Customer email failed:', emailErr);
    }

    // ── 3. Immediate WhatsApp: Welcome + Referral Link ────────────────────────
    if (phone && phone !== 'Not provided') {
      try {
        const formattedPhone = formatPhone(phone);

        // Immediate welcome message (free-form text — works within 24h window)
        await sendWhatsApp(formattedPhone, {
          messaging_product: 'whatsapp',
          to: formattedPhone,
          type: 'text',
          text: {
            preview_url: false,
            body:
              `Welcome to PYNCH, ${name}! 🌿\n\n` +
              `You're officially #${waitlistPosition} on the list. We can't wait to share our world with you.\n\n` +
              `✨ Early access + 20% off when we launch — just for you.\n\n` +
              `💌 *Refer a friend and they get 5% off too:*\n${referralLink}\n\n` +
              `*Stay Moody,*\nTashu & The PYNCH Team`
          }
        });

        // ── 4. Schedule Day-1 follow-up with 10% coupon via QStash ───────────
        await scheduleDiscountMessage({
          phone: formattedPhone,
          name,
          couponCode: couponCode10,
          waitlistPosition
        });
      } catch (metaError) {
        console.error('WhatsApp Error:', metaError);
        // We don't throw here to ensure the user still sees a success message
      }
    }

    return res.status(200).json({
      success: true,
      position: waitlistPosition,
      referralCode,
      referralLink,
      dbError: dbErrorMessage,
      ...(couponCode5 ? { couponCode5 } : {})
    });
  } catch (error) {
    console.error('Waitlist handler error:', error);
    return res.status(500).json({ error: error.message });
  }
}
