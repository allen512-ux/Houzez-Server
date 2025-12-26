require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const router = require('./routes/router');
const admin = require('firebase-admin');

/* -------------------- APP INIT -------------------- */
const app = express();
const port = process.env.PORT || 3000;

/* -------------------- FIREBASE ADMIN -------------------- */
/*
  Firebase service account JSON
  Uploaded in Render as Secret File
  Mount path: /etc/secrets/firebase-admin.json
*/
const serviceAccount = require('/etc/secrets/firebase-admin.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

/* -------------------- MIDDLEWARES -------------------- */
app.use(cors({
  origin: true,          // allows Vercel / Netlify frontend
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

/* -------------------- JWT ROUTE -------------------- */
app.post('/jwt', async (req, res) => {
  const user = req.body;

  const token = jwt.sign(
    user,
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '1h' }
  );

  res.send({ token });
});

/* -------------------- API ROUTES -------------------- */
app.use('/', router);

/* -------------------- ROOT TEST -------------------- */
app.get('/', (req, res) => {
  res.send('Hello from houzez Server..');
});

/* -------------------- START SERVER -------------------- */
app.listen(port, () => {
  console.log(`houzez is running on port ${port}`);
});
