import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.POSTGRES_URL);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const waitlist = await sql`SELECT * FROM waitlist ORDER BY created_at ASC`;
    
    // Create CSV header
    let csv = 'ID,Name,Email,Phone,Moods,Position,CouponCode10,ReferralCode,ReferredBy,CouponCode5,Date\n';

    waitlist.forEach((data) => {
      // Escape fields for CSV to prevent issues with commas or quotes
      const id = `"${(data.id || '').toString().replace(/"/g, '""')}"`;
      const name = `"${(data.name || '').replace(/"/g, '""')}"`;
      const email = `"${(data.email || '').replace(/"/g, '""')}"`;
      const phone = `"${(data.phone || '').replace(/"/g, '""')}"`;
      const moods = `"${(data.moods || '').replace(/"/g, '""')}"`;
      const position = `"${(data.position || '').toString().replace(/"/g, '""')}"`;
      const coupon10 = `"${(data.coupon_code_10 || '').replace(/"/g, '""')}"`;
      const refCode = `"${(data.referral_code || '').replace(/"/g, '""')}"`;
      const refBy = `"${(data.referred_by || '').replace(/"/g, '""')}"`;
      const coupon5 = `"${(data.coupon_code_5 || '').replace(/"/g, '""')}"`;
      const date = `"${(data.created_at ? new Date(data.created_at).toISOString() : '').replace(/"/g, '""')}"`;
      
      csv += `${id},${name},${email},${phone},${moods},${position},${coupon10},${refCode},${refBy},${coupon5},${date}\n`;
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
