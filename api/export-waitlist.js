import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

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

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const waitlistSnapshot = await getDocs(collection(db, 'waitlist'));
    
    // Create CSV header
    let csv = 'Name,Email,Phone,Moods,Date\n';

    waitlistSnapshot.forEach((doc) => {
      const data = doc.data();
      // Escape fields for CSV to prevent issues with commas or quotes
      const name = `"${(data.name || '').replace(/"/g, '""')}"`;
      const email = `"${(data.email || '').replace(/"/g, '""')}"`;
      const phone = `"${(data.phone || '').replace(/"/g, '""')}"`;
      const moods = `"${(data.moods || '').replace(/"/g, '""')}"`;
      const date = `"${(data.createdAt || '').replace(/"/g, '""')}"`;
      
      csv += `${name},${email},${phone},${moods},${date}\n`;
    });

    // Send as CSV file
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=pynch_waitlist.csv');
    res.status(200).send(csv);

  } catch (error) {
    console.error('Export Error:', error);
    res.status(500).json({ error: error.message });
  }
}
