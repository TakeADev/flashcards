import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import ViteExpress from 'vite-express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

import { User } from '../../lib/definitions.js';

import * as db from './db/index.js';

const PORT = process.env.SERVER_PORT || 8080;
const app = express();
app.use(express.json());
app.use(bodyParser.json());

app.post('/api/auth/signup', async (req, res, next) => {
  const { email, displayName, password } = req.body;
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return alert(err);
    try {
      return db.query(
        `INSERT INTO users(id, email, display_name, password, collections) VALUES($1, $2, $3, $4, $5)`,
        [uuidv4(), email, displayName, hash, []]
      );
    } catch (error) {
      console.log(error);
    }
  });
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const foundUser: User.DBUser = await db
      .query(`SELECT * FROM users WHERE email=($1);`, [email])
      .then((res) => res.rows[0]);

    if (!foundUser) return res.status(401).json({ error: 'Invalid email or password.' });

    const passwordMatch = await bcrypt.compare(password, foundUser.password);
    if (!passwordMatch) return res.status(401).json({ error: 'Invalid email or password.' });

    const token = jwt.sign({ userId: foundUser.id }, process.env.JWT_SECRET || 'secret', {
      expiresIn: '1h',
    });

    res.status(200).json({ token: token, email: email });
  } catch (error) {
    res.status(500).json({ error: 'Authentication error' });
  }
});

app.post('/api/auth/verify', async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  token &&
    jwt.verify(token, process.env.JWT_SECRET || 'secret', (err, decoded) => {
      if (err?.name === 'TokenExpiredError') {
        res.status(200).json({ token: false });
      } else if (err) {
        res.status(401).json({ error: err });
      } else res.status(200).json({ token: decoded });
    });
});

app.post('/api/users/getuser', async (req, res) => {
  try {
    const { token } = req.body;

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    const foundUser: User.DBUser = await db
      .query(`SELECT * FROM users WHERE id=($1);`, [decoded.userId])
      .then((res) => res.rows[0]);
    res.status(200).json({ user: foundUser });
  } catch (error) {
    console.log(error);
  }
});

ViteExpress.listen(app, PORT as number, () =>
  console.log(`Server is listening on port ${PORT}...`)
);
