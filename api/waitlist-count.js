import admin from 'firebase-admin';

if (!admin.apps.length) {
  try {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || '{}');
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  } catch (error) {
    console.error('Firebase Admin initialization error:', error);
  }
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const db = admin.apps.length ? admin.firestore() : null;
    
    if (!db) {
      return res.status(500).json({ error: 'Firebase not initialized' });
    }

    const waitlistCol = db.collection('waitlist');
    const countSnapshot = await waitlistCol.count().get();
    const count = countSnapshot.data().count;

    return res.status(200).json({ count });
  } catch (error) {
    console.error('Error fetching waitlist count:', error);
    return res.status(500).json({ error: 'Failed to fetch waitlist count' });
  }
}
