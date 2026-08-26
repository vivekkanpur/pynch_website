import postgres from 'postgres';
import dotenv from 'dotenv';

dotenv.config();

async function testDb() {
  const url = process.env.POSTGRES_URL;
  console.log('Connecting to:', url);
  const sql = postgres(url, { ssl: 'require' });
  try {
    const result = await sql`SELECT 1`;
    console.log('Success!', result);
  } catch (e) {
    console.error('Error:', e);
  } finally {
    await sql.end();
  }
}

testDb();
