import dotenv from 'dotenv';
dotenv.config();

import pg, { QueryResult } from 'pg';

const { Pool } = pg;

const pool = new Pool({
  user: process.env.POSTGRESDB_USER,
  password: process.env.POSTGRESDB_PASSWORD,
  host: process.env.POSTGRESDB_HOST,
  database: process.env.POSTGRESDB_DATABASE,
});

export async function query(text: string, values?: any[]): Promise<QueryResult> {
  return pool.query(text, values);
}
