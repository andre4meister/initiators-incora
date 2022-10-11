import cn from 'classnames';
import { FC, useState } from 'react';
import { ColorModeType } from 'types/CommonTypes';
import { InputType } from '../../types/InputTypes';
import s from './Input.module.scss';

const Input: FC<InputType> = ({ type, required }) => {
  const [text, setText] = useState<string>('');
  const [colorMode, setColorMode] = useState<ColorModeType>('light');
  return (
    <input
      value={text}
      type={type}
      required={required}
      className={cn({
        [s.input]: true,
        [s.inputLight]: colorMode === 'light',
        [s.inputDark]: colorMode === 'dark',
      })}
      onChange={(e) => setText(e.target.value)}
    />
  );
};


{/* const Input: FC<InputType> = ({
  classes, handleOnChange, type, required, placeholder, value,
}) => (
  <input
    value={value}
    type={type}
    required={required}
    className={cn(styles.input, classes)}
    onChange={handleOnChange}
    placeholder={placeholder}
  />
); */}

export default Input;
