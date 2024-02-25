import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

export async function executeQuery(query: string) {
  const client = await pool.connect();
  try {
    const output = await client.query(query);
    return output.rows;
  } finally {
    client.release();
  }
}
