import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import ViteExpress from 'vite-express';
const app = express();

import { usersToSeed } from './db/data/users.js';
import { seedUsers } from './db/seed.js';

import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  user: process.env.POSTGRESDB_USER,
  password: process.env.POSTGRESDB_PASSWORD,
  host: process.env.POSTGRESDB_HOST,
  database: process.env.POSTGRESDB_DATABASE,
});

const PORT = process.env.SERVER_PORT || 8080;

app.get('/seed', (_, res) => {
  try {
    seedUsers(usersToSeed);
  } catch (error) {
    console.log(error);
  }
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
