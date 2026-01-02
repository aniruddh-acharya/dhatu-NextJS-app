/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pool, QueryResult } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const query = async (
  text: string,
  params: any[] = [] 
): Promise<QueryResult> => {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('executed query', { text, duration, rows: res.rowCount });
    return res;
  } catch (error) {
    console.error('Error executing query', { text, error });
    throw error;
  }
};