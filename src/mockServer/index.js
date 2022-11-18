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

const booking = {
  rooms: [
    {
      id: 1,
      name: 'Nest26',
      floor: 2,
      devices: ['White board'],
      maxPeople: 5,
      minPeople: 2,
      soonestBookings: [
        {
          id: 3,
          createdAt: '2022-10-29T16:21:58.000Z',
          meetingDate: '2022-11-02',
          startTime: '08:00:00',
          endTime: '09:00:00',
        },
        {
          id: 665,
          createdAt: '2022-10-29T16:21:58.000Z',
          meetingDate: '2022-11-07',
          startTime: '15:00:00',
          endTime: '16:00:00',
        },
        {
          id: 4,
          createdAt: '2022-10-30T16:21:58.000Z',
          meetingDate: '2022-11-03',
          startTime: '11:00:00',
          endTime: '12:00:00',
        },
        {
          id: '6b4ad80c-fade-4741-b0ef-2f0f0f457674',
          generatedFromRecurrentBookingWithId: 3,
          createdAt: '2022-10-28T16:21:58.000Z',
          meetingDate: '2022-11-04',
          startTime: '10:00:00',
          endTime: '12:00:00',
        },
        {
          id: '15206b7c-7cdc-4e5a-b0bb-4778fb76b487',
          generatedFromRecurrentBookingWithId: 6,
          createdAt: '2022-10-28T16:21:58.000Z',
          meetingDate: '2022-11-04',
          startTime: '10:00:00',
          endTime: '11:30:00',
        },
        {
          id: '6b4ad80c-fade-4741-b0ef-2f0f0f457670',
          generatedFromRecurrentBookingWithId: 3,
          createdAt: '2022-10-28T16:21:58.000Z',
          meetingDate: '2022-11-04',
          startTime: '10:00:00',
          endTime: '14:00:00',
        },
        {
          id: 6,
          createdAt: '2022-11-01T16:21:58.000Z',
          meetingDate: '2022-11-04',
          startTime: '16:00:00',
          endTime: '17:00:00',
        },
        {
          id: '20b9cdb4-116a-4374-b508-a44e2b5fde74',
          generatedFromRecurrentBookingWithId: 3,
          createdAt: '2022-10-28T16:21:58.000Z',
          meetingDate: '2022-11-08',
          startTime: '10:00:00',
          endTime: '12:00:00',
        },
        {
          id: '1c99bf76-ec8d-4b8a-92cc-6b74beed367c',
          generatedFromRecurrentBookingWithId: 6,
          createdAt: '2022-10-28T16:21:58.000Z',
          meetingDate: '2022-11-08',
          startTime: '10:00:00',
          endTime: '12:00:00',
        },
        {
          id: '29e87f9e-51c0-46c8-bb4e-038409100b95',
          generatedFromRecurrentBookingWithId: 3,
          createdAt: '2022-10-28T16:21:58.000Z',
          meetingDate: '2022-11-11',
          startTime: '10:00:00',
          endTime: '12:00:00',
        },
        {
          id: '9196d74a-e8cc-4078-848d-41c9e73377bc',
          generatedFromRecurrentBookingWithId: 6,
          createdAt: '2022-10-28T16:21:58.000Z',
          meetingDate: '2022-11-11',
          startTime: '10:00:00',
          endTime: '12:00:00',
        },
        {
          id: 1,
          createdAt: '2022-10-28T16:21:58.000Z',
          meetingDate: '2022-11-13',
          startTime: '18:30:00',
          endTime: '19:00:00',
        },
        {
          id: '39e20467-1f77-4b42-b235-132765b1e4a2',
          generatedFromRecurrentBookingWithId: 3,
          createdAt: '2022-10-28T16:21:58.000Z',
          meetingDate: '2022-11-15',
          startTime: '10:00:00',
          endTime: '12:00:00',
        },
        {
          id: '2d8345dd-465d-4858-832e-136efe8f5610',
          generatedFromRecurrentBookingWithId: 6,
          createdAt: '2022-10-28T16:21:58.000Z',
          meetingDate: '2022-11-15',
          startTime: '10:00:00',
          endTime: '12:00:00',
        },
        {
          id: '7954b5fc-4126-4f01-a046-73ebc735e354',
          generatedFromRecurrentBookingWithId: 3,
          createdAt: '2022-10-28T16:21:58.000Z',
          meetingDate: '2022-11-18',
          startTime: '10:00:00',
          endTime: '12:00:00',
        },
        {
          id: '7954b5fc-4126-4f01-a046-73ebc735e354555',
          generatedFromRecurrentBookingWithId: 3,
          createdAt: '2022-10-28T16:21:58.000Z',
          meetingDate: '2022-11-18',
          startTime: '13:30:00',
          endTime: '14:00:00',
        },
        {
          id: 'cb2d5eb1-042c-49be-9d01-d21ff3c66901',
          generatedFromRecurrentBookingWithId: 6,
          createdAt: '2022-10-28T16:21:58.000Z',
          meetingDate: '2022-11-18',
          startTime: '10:00:00',
          endTime: '12:00:00',
        },
        {
          id: 'b943b0cc-3ab1-4d69-8c30-a26d3999d795',
          generatedFromRecurrentBookingWithId: 3,
          createdAt: '2022-10-28T16:21:58.000Z',
          meetingDate: '2022-11-22',
          startTime: '10:00:00',
          endTime: '12:00:00',
        },
        {
          id: 'ac567f96-d977-466d-8ef3-4b8452a79d0d',
          generatedFromRecurrentBookingWithId: 6,
          createdAt: '2022-10-28T16:21:58.000Z',
          meetingDate: '2022-11-22',
          startTime: '10:00:00',
          endTime: '12:00:00',
        },
      ],
    },
    {
      id: 2,
      name: 'MainNest',
      floor: 2,
      devices: [
        'White board',
        'Big screen',
        'Water cooler',
        'PlayStation',
        'Air conditioner',
        'Sound system',
        'Tennis table',
      ],
      maxPeople: 15,
      minPeople: 2,
      soonestBookings: [
        {
          id: '15f4611b-613e-4133-8314-dba7ddbac615',
          generatedFromRecurrentBookingWithId: 2,
          createdAt: '2022-10-28T16:21:58.000Z',
          meetingDate: '2022-11-02',
          startTime: '17:00:00',
          endTime: '18:00:00',
        },
        {
          id: '1f23bad1-329c-4f84-8b3c-6b4120c2c64a',
          generatedFromRecurrentBookingWithId: 5,
          createdAt: '2022-10-28T16:21:58.000Z',
          meetingDate: '2022-11-02',
          startTime: '17:00:00',
          endTime: '18:00:00',
        },
        {
          id: 7,
          createdAt: '2022-11-02T16:21:58.000Z',
          meetingDate: '2022-11-05',
          startTime: '09:00:00',
          endTime: '10:00:00',
        },
        {
          id: 8,
          createdAt: '2022-11-03T16:21:58.000Z',
          meetingDate: '2022-11-05',
          startTime: '10:00:00',
          endTime: '11:00:00',
        },
        {
          id: 'd0998d35-9ecb-4517-bd93-898af9ec15d7',
          generatedFromRecurrentBookingWithId: 2,
          createdAt: '2022-10-28T16:21:58.000Z',
          meetingDate: '2022-11-09',
          startTime: '17:00:00',
          endTime: '18:00:00',
        },
        {
          id: '573be2ee-03f0-4921-923c-e6a99725d81c',
          generatedFromRecurrentBookingWithId: 5,
          createdAt: '2022-10-28T16:21:58.000Z',
          meetingDate: '2022-11-09',
          startTime: '17:00:00',
          endTime: '18:00:00',
        },
      ],
    },
    {
      id: 5,
      name: 'React13',
      floor: 2,
      devices: ['White board', 'Big screen', 'Water cooler', 'Tennis table'],
      maxPeople: 5,
      minPeople: 2,
      soonestBookings: [],
    },
    {
      id: 6,
      name: 'SQL26',
      floor: 2,
      devices: [
        'White board',
        'Big screen',
        'Water cooler',
        'PlayStation',
        'Air conditioner',
        'Sound system',
        'Tennis table',
      ],
      maxPeople: 5,
      minPeople: 2,
      soonestBookings: [],
    },
    {
      id: 4,
      name: 'React26',
      floor: 3,
      devices: ['White board', 'Big screen', 'Water cooler', 'Air conditioner'],
      maxPeople: 5,
      minPeople: 2,
      soonestBookings: [],
    },
    {
      id: 3,
      name: 'Nest13',
      floor: 3,
      devices: [
        'White board',
        'Big screen',
        'Water cooler',
        'PlayStation',
        'Air conditioner',
        'Sound system',
        'Tennis table',
      ],
      maxPeople: 5,
      minPeople: 2,
      soonestBookings: [
        {
          id: 2,
          createdAt: '2022-10-28T16:21:58.000Z',
          meetingDate: '2022-11-17',
          startTime: '09:00:00',
          endTime: '10:00:00',
        },
      ],
    },
  ],
};

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

router.get('/booking', (req, res) => {
  try {
    return res.json(booking);
  } catch (err) {
    console.log(err);
  }
});

app.use(
  cors({
    allowedOrigins: ['http://localhost:3000'],
    allowedHeaders: 'Content-Type,Authorization',
  }),
);
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
