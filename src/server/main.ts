import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import ViteExpress from 'vite-express';
const app = express();

import pg from 'pg';

const { Client } = pg;
const client = new Client({
  user: process.env.POSTGRESDB_USER,
  password: process.env.POSTGRESDB_PASSWORD,
  host: process.env.POSTGRESDB_HOST,
  database: process.env.POSTGRESDB_DATABASE,
});

await client.connect();

const cres = await client.query('SELECT $1::text as message', ['Hello world!']);

const PORT = process.env.SERVER_PORT || 8080;

app.get('/hello', (_, res) => {
  console.log(cres.rows[0].message);
  res.send('Hello Vite + React + TypeScript!');
});

ViteExpress.listen(app, PORT as number, () =>
  console.log(`Server is listening on port ${PORT}...`)
);
