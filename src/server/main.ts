import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import ViteExpress from 'vite-express';
import bodyParser from 'body-parser';

import pg from 'pg';
import * as db from './db/index.js';

const app = express();
app.use(bodyParser.json());

const { Pool } = pg;

const pool = new Pool({
  user: process.env.POSTGRESDB_USER,
  password: process.env.POSTGRESDB_PASSWORD,
  host: process.env.POSTGRESDB_HOST,
  database: process.env.POSTGRESDB_DATABASE,
});

const PORT = process.env.SERVER_PORT || 8080;

app.post('/signup', async (req, res) => {
  const { email, name, password } = req.body;

  try {
    db.query(`INSERT INTO users(email, name, password, collections) VALUES($1, $2, $3, $4)`, [
      email,
      name,
      password,
      [],
    ]).then();
  } catch (error) {
    console.log(error);
  }
});

app.get('/seed', (_, res) => {
  try {
  } catch (error) {
    console.log(error);
  }
  res.send('Hello Vite + React + TypeScript!');
});

app.get('/getuser', async (_, res) => {
  try {
    await db.query(`SELECT * FROM users`).then((result) => res.send(result.rows[0]));
  } catch (error) {
    res.send(`There was an error: ${error}`);
  }
});

app.get('/deleteusers', (_, res) => {
  pool.query('DELETE FROM users;');
  res.send('users deleted');
});

ViteExpress.listen(app, PORT as number, () =>
  console.log(`Server is listening on port ${PORT}...`)
);
