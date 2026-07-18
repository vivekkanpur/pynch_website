import { Resend } from 'resend';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getCountFromServer } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Vercel automatically exposes files in /api as serverless functions.
// process.env.RESEND_API_KEY must be set in Vercel or locally in .env
const resend = new Resend(process.env.RESEND_API_KEY || 'dummy_key');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, moods } = req.body;

    // Save to Firebase Firestore
    let waitlistPosition = 2401; // default fallback
    try {
      const waitlistColl = collection(db, 'waitlist');
      const snapshot = await getCountFromServer(waitlistColl);
      const dbCount = snapshot.data().count;
      waitlistPosition = 2400 + dbCount + 1;

      await addDoc(waitlistColl, {
        name: name || '',
        email: email || '',
        phone: phone || '',
        moods: moods || '',
        position: waitlistPosition,
        createdAt: new Date().toISOString()
      });
    } catch (fbError) {
      console.error('Firebase save error:', fbError);
    }

    // 1. Email to the Owner (Internal Notification)
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
        </div>
      `
    });

    if (ownerResponse.error) {
      throw new Error(`Resend Owner Email Failed: ${ownerResponse.error.message}`);
    }

    // 2. Email to the Customer (Autoresponder)
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

    if (customerResponse.error) {
      throw new Error(`Resend Customer Email Failed: ${customerResponse.error.message}`);
    }

    // 3. WhatsApp Notification via Meta Business API
    if (phone && phone !== "Not provided") {
      try {
        let formattedPhone = phone.trim().replace(/\D/g, ''); // Ensure only digits
        // Basic formatting: assuming 91 if no country code provided and length is 10
        if (formattedPhone.length === 10) {
          formattedPhone = '91' + formattedPhone;
        }

        if (process.env.META_WHATSAPP_TOKEN && process.env.META_PHONE_NUMBER_ID) {
          // Note: Meta typically requires a pre-approved 'template' message for business-initiated updates.
          // This uses a standard text message for simplicity, which works within a 24h customer service window.
          // If this fails in production, you will need to switch "type" to "template" and provide your template name.
          const metaResponse = await fetch(`https://graph.facebook.com/v17.0/${process.env.META_PHONE_NUMBER_ID}/messages`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${process.env.META_WHATSAPP_TOKEN}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              messaging_product: "whatsapp",
              to: formattedPhone,
              type: "text",
              text: {
                preview_url: false,
                body: `Welcome to PYNCH, ${name}.\n\nYou are officially on the waitlist. Your spot is #${waitlistPosition} in line. We are incredibly excited to share our world with you.\n\nWe will reach out the moment we launch so you can claim your early access and your exclusive 20% off.\n\nStay Moody,\nTashu & The PYNCH Team`
              }
            })
          });

          if (!metaResponse.ok) {
            const errorData = await metaResponse.json();
            console.error('Meta WhatsApp API Error:', errorData);
          }
        } else {
          console.log('Meta credentials missing. Skipping WhatsApp notification.');
        }
      } catch (metaError) {
        console.error('WhatsApp Error:', metaError);
        // We don't throw here to ensure the user still sees a success message 
      }
    }

    return res.status(200).json({ success: true, position: waitlistPosition });
  } catch (error) {
    console.error('Resend Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
