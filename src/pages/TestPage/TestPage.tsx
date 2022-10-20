import Button from 'components/UI/Button/Button';
import Calendar from 'components/UI/Calendar/Calendar';
import CheckBox from 'components/UI/CheckBox/CheckBox';
import Input from 'components/UI/Input/Input';
import { FC, useState } from 'react';

const TestPage: FC = () => {
  const [input, setInput] = useState('');
  const [checkbox, setCheckbox] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <Input type="text" handleOnChange={({ target }) => setInput(target.value)} value={input} placeholder="Input" />
      <Button handleOnClick={() => console.log('click')}>Button</Button>
      <CheckBox isChecked={checkbox} handleOnChange={() => setCheckbox((prev) => !prev)} />
      <Calendar />
    </div>
  );
};
export default TestPage;
