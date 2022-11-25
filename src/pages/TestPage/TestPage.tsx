import Button from 'components/UI/Button/Button';
import DatePicker from 'components/UI/DatePicker/DatePicker';
import CheckBox from 'components/UI/CheckBox/CheckBox';
import Input from 'components/UI/Input/Input';
import Upload from 'components/UI/Upload/Upload';
import moment from 'moment';
import { FC, useState } from 'react';
import GuestsSelect from 'components/UI/GuestsSelect/GuestsSelect';
import { Booking } from 'types/dataTypes';

const booking: Booking = {
  title: 'test title',
  daysOfWeek: [],
  startDate: '',
  endDate: '',
  id: 0,
  createdAt: '',
  isRecurring: false,
  meetingDate: '2022-11-25',
  startTime: '12:30:00',
  endTime: '',
  room: {
    id: '',
    name: '',
    floor: 0,
    devices: [],
    maxPeople: 0,
    minPeople: 0,
  },
  guests: [{
    id: 0,
    approved: false,
    role: '',
    email: '1nikitos1003@gmail.com',
    firstName: 'Kaneda',
    lastName: 'Shotaro',
    createdAt: '',
  },
  {
    id: 0,
    approved: false,
    role: '',
    email: 'htoEto@gmail.com',
    firstName: 'Random',
    lastName: 'Guy',
    createdAt: '',
  },
  ],
  owner: {
    id: 0,
    approved: false,
    role: '',
    email: '',
    firstName: '',
    lastName: '',
    createdAt: '',
  },
};

const TestPage: FC = () => {
  const [input, setInput] = useState('');
  const [checkbox, setCheckbox] = useState(false);
  const [selectedDate, setSelectedDate] = useState(moment());

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <Input
        type="text"
        handleOnChange={({ target }) => setInput(target.value)}
        value={input}
        placeholder="Input"
      />
      <Button handleOnClick={() => console.log('click')}>Button</Button>
      <CheckBox isChecked={checkbox} handleOnChange={() => setCheckbox((prev) => !prev)} />
      <DatePicker setSelectedDate={setSelectedDate} selectedDate={selectedDate} />
      <Upload />
      <GuestsSelect booking={booking} />
    </div>
  );
};
export default TestPage;
