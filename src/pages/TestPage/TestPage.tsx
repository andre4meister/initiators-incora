import Button from 'components/UI/Button/Button';
import DataPicker from 'components/UI/DataPicker/DataPicker';
import CheckBox from 'components/UI/CheckBox/CheckBox';
import Input from 'components/UI/Input/Input';
import Upload from 'components/UI/Upload/Upload';
import moment from 'moment';
import { FC, useState } from 'react';

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
      <DataPicker setSelectedDate={setSelectedDate} selectedDate={selectedDate} />
      <Upload />
    </div>
  );
};
export default TestPage;
