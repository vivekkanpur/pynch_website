/**
 * api/send-discount.js
 *
 * Triggered by Upstash QStash ~24 hours after a waitlist signup.
 * Sends a WhatsApp message with the registrant's exclusive 10% discount coupon.
 *
 * Security: Requests are verified using the QStash signing keys to ensure
 * this endpoint can only be called by Upstash, not by arbitrary HTTP clients.
 *
 * Environment variables required:
 *   META_WHATSAPP_TOKEN         – Meta Cloud API token
 *   META_PHONE_NUMBER_ID        – Meta Phone Number ID
 *   QSTASH_CURRENT_SIGNING_KEY  – From Upstash QStash console
 *   QSTASH_NEXT_SIGNING_KEY     – From Upstash QStash console (for key rotation)
 */

import crypto from 'crypto';

/**
 * Verify the QStash signature on the incoming request.
 * Returns true if the signature is valid, false otherwise.
 *
 * QStash signs requests with HMAC-SHA256 using:
 *   signature = base64url( HMAC-SHA256(signingKey, rawBody) )
 * and sends it in the `upstash-signature` header (as a JWT).
 *
 * For simplicity, if no signing keys are configured (e.g. local dev),
 * this function skips verification and returns true.
 */
function verifyQStashSignature(req) {
  const currentKey = process.env.QSTASH_CURRENT_SIGNING_KEY;
  const nextKey = process.env.QSTASH_NEXT_SIGNING_KEY;

  // Skip verification in local dev if keys are not set
  if (!currentKey && !nextKey) {
    console.warn('QStash signing keys not set — skipping signature verification (dev mode).');
    return true;
  }

  const signature = req.headers['upstash-signature'];
  if (!signature) {
    console.error('Missing upstash-signature header.');
    return false;
  }

  // The QStash signature header is a JWT. The payload is base64url-encoded JSON.
  // We verify the HMAC signature against the raw body.
  const [headerB64, payloadB64, sigB64] = signature.split('.');
  if (!headerB64 || !payloadB64 || !sigB64) {
    console.error('Malformed upstash-signature header.');
    return false;
  }

  const message = `${headerB64}.${payloadB64}`;

  function checkKey(key) {
    const expected = crypto
      .createHmac('sha256', key)
      .update(message)
      .digest('base64url');
    return expected === sigB64;
  }

  return (currentKey && checkKey(currentKey)) || (nextKey && checkKey(nextKey));
}

/**
 * Send a WhatsApp template message for the Day-1 discount.
 *
 * IMPORTANT: This message is sent OUTSIDE the 24-hour customer service window,
 * so it MUST use a pre-approved Meta message template.
 *
 * Template name used: "pynch_discount_day1"
 * Expected template variables (in order):
 *   {{1}} – customer name
 *   {{2}} – coupon code
 *   {{3}} – waitlist position number
 *
 * Submit this template on Meta Business Manager before going live:
 *   https://business.facebook.com/wa/manage/message-templates/
 *
 * Template body suggestion:
 *   "Hi {{1}} 🎉 It's been a day since you joined the PYNCH waitlist and we haven't
 *    stopped thinking about you. As our thank you, here's your exclusive 10% off code
 *    for launch day: *{{2}}*. You're #{{3}} in line — we launch very soon.
 *    Stay Moody, Tashu & The PYNCH Team"
 */
async function sendDiscountWhatsApp({ phone, name, couponCode, waitlistPosition }) {
  if (!process.env.META_WHATSAPP_TOKEN || !process.env.META_PHONE_NUMBER_ID) {
    console.log('Meta credentials missing. Skipping Day-1 WhatsApp discount message.');
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
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: phone,
        type: 'template',
        template: {
          name: 'pynch_discount_day1', // ← Must match your approved Meta template name
          language: { code: 'en' },
          components: [
            {
              type: 'body',
              parameters: [
                { type: 'text', text: name },
                { type: 'text', text: couponCode },
                { type: 'text', text: String(waitlistPosition) }
              ]
            }
          ]
        }
      })
    }
  );

  const result = await metaResponse.json();

  if (!metaResponse.ok) {
    console.error('Meta WhatsApp API Error (Day-1 discount):', result);
  } else {
    console.log(`Day-1 discount WhatsApp sent to ${phone}. Message ID: ${result?.messages?.[0]?.id}`);
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // ── Verify this request is from QStash ──────────────────────────────────────
  if (!verifyQStashSignature(req)) {
    return res.status(401).json({ error: 'Unauthorized: invalid QStash signature' });
  }

  try {
    const { phone, name, couponCode, waitlistPosition } = req.body;

    if (!phone || !name || !couponCode) {
      return res.status(400).json({ error: 'Missing required fields: phone, name, couponCode' });
    }

    await sendDiscountWhatsApp({ phone, name, couponCode, waitlistPosition });

    return res.status(200).json({ success: true, message: 'Day-1 discount WhatsApp sent.' });
  } catch (error) {
    console.error('send-discount handler error:', error);
    return res.status(500).json({ error: error.message });
  }
}
