import dotenv from 'dotenv';
dotenv.config();

import express, { query } from 'express';
import ViteExpress from 'vite-express';
const app = express();

import pg from 'pg';

const { Pool } = pg;
import { User } from '../../lib/definitions.js';

const pool = new Pool({
  user: process.env.POSTGRESDB_USER,
  password: process.env.POSTGRESDB_PASSWORD,
  host: process.env.POSTGRESDB_HOST,
  database: process.env.POSTGRESDB_DATABASE,
});

async function seedUsers(users: User[]) {
  // await pool.query(`
  //   CREATE TABLE users (
  //   display_name varchar(20),
  //   name varchar(20),
  //   bio varchar(250),
  //   collections text[]
  // );`);
  //
  const queryText = `INSERT INTO users VALUES($1, $2, $3, $4);`;
  try {
    users.map((user) => {
      pool.query(queryText, [user.displayName, user.name, user.bio, user.collections]);
    });
  } catch (err) {
    console.log(err);
  }
}

const usersToSeed: User[] = [
  {
    displayName: 'testy',
    name: 'test boy',
    bio: 'this is a bio with spaces',
    collections: ['cards1', 'cards2', 'cards3'],
  },
];

const PORT = process.env.SERVER_PORT || 8080;

app.get('/seed', (_, res) => {
  seedUsers(usersToSeed);
  res.send('Hello Vite + React + TypeScript!');
});

app.get('/getusers', (_, res) => {
  pool.query('SELECT * FROM users;').then((resp) => res.send(resp.rows));
});

app.get('/deleteusers', (_, res) => {
  pool.query('DELETE FROM users;');
  res.send('users deleted');
});

ViteExpress.listen(app, PORT as number, () =>
  console.log(`Server is listening on port ${PORT}...`)
);
