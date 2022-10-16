import Button from 'components/UI/Button/Button';
import Calendar from 'components/UI/Calendar/Calendar';
import CheckBox from 'components/UI/CheckBox/CheckBox';
import Input from 'components/UI/Input/Input';
import Toggle from 'components/UI/Toggle/Toggle';
import { FC, useState } from 'react';

const TestPage: FC = () => {
  const [input, setInput] = useState('');
  const [checkbox, setCheckbox] = useState(false);
  const [toggle, setToggle] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <Input type="text" handleOnChange={({ target }) => setInput(target.value)} value={input} placeholder="Input" />
      <Button handleOnClick={() => console.log('click')}>Button</Button>
      <CheckBox isChecked={checkbox} onChange={() => setCheckbox((prev) => !prev)} />
      {/* <Toggle isToggle={toggle} onChange={() => setToggle((prev) => !prev)} /> */}
      <Calendar />
    </div>
  );
};
export default TestPage;
