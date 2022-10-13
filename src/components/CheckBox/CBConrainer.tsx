import { useState } from 'react';
import Toggle from 'components/Toggle/Toggle';
import CheckBox from './CheckBox';

const CheckBoxContainer = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isToggle, setIsToogle] = useState<boolean>(false);

  const onCheckBoxHandler = () => setIsChecked(!isChecked);

  const onToggleHandler = () => setIsToogle(!isToggle);

  return (
    <>
      <CheckBox isChecked={isChecked} onChange={onCheckBoxHandler} />
      <Toggle isToggle={isToggle} onChange={onToggleHandler} />
    </>
  );
};

export default CheckBoxContainer;
