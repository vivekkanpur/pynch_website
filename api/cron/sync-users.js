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
  // Check if it's a valid cron request (optional security check)
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const sheetId = "1hN8z4e605JTkt44HuBo-HZyQ6qS9E3ZxdUkZaTkHQro";
    if (!sheetId) {
      console.error('Missing GOOGLE_SHEET_ID');
      return res.status(500).json({ error: 'Missing GOOGLE_SHEET_ID' });
    }

    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || '{}');
    if (!serviceAccount.client_email) {
      console.error('Missing FIREBASE_SERVICE_ACCOUNT or invalid format');
      return res.status(500).json({ error: 'Missing credentials' });
    }

    // Initialize auth - with google-spreadsheet v4 we need to pass a JWT auth client
    const jwt = new JWT({
      email: serviceAccount.client_email,
      key: serviceAccount.private_key,
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
      ],
    });

    const doc = new GoogleSpreadsheet(sheetId, jwt);
    await doc.loadInfo();

    // Use the second sheet (index 1) for Users
    const sheet = doc.sheetsByIndex[1]; 
    if (!sheet) {
      console.error('Second tab (Users) not found in Google Sheet');
      return res.status(500).json({ error: 'Users sheet not found' });
    }

    // Set headers if they aren't there
    await sheet.setHeaderRow(['UID', 'Email', 'Phone', 'Created At', 'Last Login At']);

    // Fetch all users from Firebase Auth
    const listUsersResult = await admin.auth().listUsers(1000); // adjust batch size if you have >1000
    const users = listUsersResult.users;

    // Clear existing rows (except header) and add new ones
    // A simple way to overwrite is to clear the sheet entirely, but google-spreadsheet clear() removes headers.
    // Instead, we'll fetch existing rows and clear them, then add the new batch.
    const rows = await sheet.getRows();
    if (rows.length > 0) {
      // It's faster to clear the whole sheet and reset headers
      await sheet.clear();
      await sheet.setHeaderRow(['UID', 'Email', 'Phone', 'Created At', 'Last Login At']);
    }

    // Prepare rows
    const rowsToAdd = users.map(user => ({
      'UID': user.uid,
      'Email': user.email || '',
      'Phone': user.phoneNumber || '',
      'Created At': user.metadata.creationTime,
      'Last Login At': user.metadata.lastSignInTime
    }));

    if (rowsToAdd.length > 0) {
      await sheet.addRows(rowsToAdd);
    }

    return res.status(200).json({ success: true, count: rowsToAdd.length });

  } catch (error) {
    console.error('Error syncing users to sheets:', error);
    return res.status(500).json({ error: 'Sync failed' });
  }
}
