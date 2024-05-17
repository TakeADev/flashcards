import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import ViteExpress from 'vite-express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';

import * as db from './db/index.js';

const PORT = process.env.SERVER_PORT || 8080;
const app = express();
app.use(bodyParser.json());

function verifyUser(email: string, password: string) {
  try {
    db.query(`SELECT * FROM users WHERE email=($1);`, [email]).then((queryResult) =>
      bcrypt.compare(password, queryResult.rows[0].password).then((comparison) => {
        return comparison;
      })
    );
  } catch (error) {
    return error;
  }
}

app.post('/signup', async (req, res, next) => {
  const { email, name, password } = req.body;
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return alert(err);
    try {
      return db.query(
        `INSERT INTO users(email, name, password, collections) VALUES($1, $2, $3, $4)`,
        [email, name, hash, []]
      );
    } catch (error) {
      console.log(error);
    }
  });
});

app.get('/fail', (req, res) => {
  res.send('failed');
});

app.post('/login', (req, res) => {
  return;
});

ViteExpress.listen(app, PORT as number, () =>
  console.log(`Server is listening on port ${PORT}...`)
);
