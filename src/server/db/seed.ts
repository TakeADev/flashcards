import { User } from '../../../lib/definitions.js';
import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  user: process.env.POSTGRESDB_USER,
  password: process.env.POSTGRESDB_PASSWORD,
  host: process.env.POSTGRESDB_HOST,
  database: process.env.POSTGRESDB_DATABASE,
});

export async function seedUsers(users: User[]) {
  await pool.query(`
     CREATE TABLE users (
     email varchar(50),
     display_name varchar(20),
     name varchar(20),
     collections text[]
   );`);

  const queryText = `INSERT INTO users VALUES($1, $2, $3, $4);`;
  try {
    users.map((user) => {
      pool.query(queryText, [user.email, user.displayName, user.name, user.collections]);
    });
  } catch (err) {
    console.log(err);
  }
}
