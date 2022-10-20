/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
// eslint-disable-next-line import/no-extraneous-dependencies, @typescript-eslint/no-var-requires
const express = require('express');
const cors = require('express-cors');

const router = express.Router();
const app = express();
const PORT = 5000;

router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;

    if (email !== 'test@incorainc.com') {
      return res.json({ message: 'wrong email' });
    }

    if (password !== '12345678') {
      return res.json({ message: 'wrong password' });
    }

    return res.json({
      id: 410,
      role: 'admin',
      password: '12345678',
      email: 'incorainc',
      firstName: 'Admin',
      lastName: 'Adminenko',
    });
  } catch (err) {
    console.log(err);
  }
});

app.use(cors({
  allowedOrigins: [
    'http://localhost:3000',
  ],
}));
app.use(express.json());
app.use('/', router);

const start = () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server start on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
