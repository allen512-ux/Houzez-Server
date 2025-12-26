require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const router = require('./routes/router');
const admin = require('firebase-admin');


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const port = process.env.PORT || 3000;
const app = express();

// const corsOptions = {
//   origin: [
//     'http://localhost:5173',
//     'http://localhost:5175',
    
//   ],
//   credentials: true,
//   optionSuccessStatus: 200,
// };

app.use(cors({
  origin: true,
  credentials: true
}));


app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

app.post('/jwt', async (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
  res.send({ token });
});

app.use('/', router);

app.get('/', (req, res) => {
  res.send('Hello from houzez Server..');
});

app.listen(port, () => {
  console.log(`houzez is running on port ${port}`);
});