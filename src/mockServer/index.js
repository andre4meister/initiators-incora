/* eslint-disable @typescript-eslint/no-unsafe-return */
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

const mockRooms = [
  {
    id: 1,
    officeId: 1,
    desciption: 'For camp',
    floor: 1,
    maxPeople: 20,
    minPeople: 8,
    name: 'Headquartes',
    camera: true,
    projector: false,
    tv: true,
  },
  {
    id: 2,
    officeId: 1,
    desciption: 'For all',
    floor: 2,
    maxPeople: 30,
    minPeople: 12,
    name: 'BigOne',
    camera: false,
    projector: false,
    tv: false,
  },
  {
    id: 19,
    officeId: 1,
    desciption: 'Boss is sitting there',
    floor: 1,
    maxPeople: 10,
    minPeople: 2,
    name: 'BossPlace',
    camera: true,
    projector: false,
    tv: true,
  },
  {
    id: 29,
    officeId: 1,
    desciption: 'DreamTeam',
    floor: 2,
    maxPeople: 15,
    minPeople: 5,
    name: 'Heaven',
    camera: true,
    projector: true,
    tv: true,
  },
];

router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;

    if (email !== 'test@incorainc.com') {
      return res.status(403).json({ message: 'wrong email' });
    }

    if (password !== '12345678') {
      return res.status(403).json({ message: 'wrong password' });
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

router.get('/rooms', (req, res) => {
  try {
    console.log(req);
    return res.json(mockRooms);
  } catch (err) {
    console.log(err);
  }
});

app.use(cors({
  allowedOrigins: [
    'http://localhost:3000',
  ],
  allowedHeaders: 'Content-Type,Authorization',
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
