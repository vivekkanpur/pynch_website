// Real-time sync of a single user into the Google Sheets "users" tab.
// Called by the client immediately after a successful sign-in, so a new
// user shows up in the sheet right away instead of waiting for the nightly
// cron (api/cron/sync-users.js), which still runs as a reconciliation backup.
import admin from 'firebase-admin';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

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
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { idToken } = req.body;
    if (!idToken) {
      return res.status(400).json({ error: 'Missing idToken' });
    }

    // Verify the token server-side rather than trusting client-sent
    // uid/email/phone directly.
    const decoded = await admin.auth().verifyIdToken(idToken);
    const userRecord = await admin.auth().getUser(decoded.uid);

    const sheetId = "1hN8z4e605JTkt44HuBo-HZyQ6qS9E3ZxdUkZaTkHQro";
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || '{}');

    if (!serviceAccount.client_email) {
      return res.status(500).json({ error: 'Missing credentials' });
    }

    const jwt = new JWT({
      email: serviceAccount.client_email,
      key: serviceAccount.private_key,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(sheetId, jwt);
    await doc.loadInfo();

    const sheet = doc.sheetsByTitle['users'] || doc.sheetsByTitle['Users'] || doc.sheetsByTitle['USERS'];
    if (!sheet) {
      return res.status(500).json({ error: 'Users sheet not found' });
    }

    await sheet.setHeaderRow(['UID', 'Email', 'Phone', 'Created At', 'Last Login At']);

    const rows = await sheet.getRows();
    const existingRow = rows.find((row) => row.get('UID') === userRecord.uid);

    if (existingRow) {
      existingRow.set('Last Login At', userRecord.metadata.lastSignInTime);
      await existingRow.save();
    } else {
      await sheet.addRow({
        'UID': userRecord.uid,
        'Email': userRecord.email || '',
        'Phone': userRecord.phoneNumber || '',
        'Created At': userRecord.metadata.creationTime,
        'Last Login At': userRecord.metadata.lastSignInTime,
      });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error syncing user to sheet:', error);
    return res.status(500).json({ error: 'Sync failed' });
  }
}
