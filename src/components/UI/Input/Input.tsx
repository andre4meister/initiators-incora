import cn from 'classnames';
import { FC, useState } from 'react';
import { ColorModeType } from 'types/CommonTypes';
import { InputType } from '../../../types/InputTypes';
import s from './Input.module.scss';
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

const Input: FC<InputType> = ({
  type,
  name,
  classes,
  handleOnChange,
  required,
  placeholder,
  value,
}) => {
  const [text, setText] = useState<string>('');
  const [colorMode, setColorMode] = useState<ColorModeType>('light');
  return (
    <input
      name={name}
      placeholder={placeholder}
      value={value}
      type={type}
      required={required}
      className={cn({
        [s.input]: true,
        [s.inputLight]: colorMode === 'light',
        [s.inputDark]: colorMode === 'dark',
      })}
      onChange={handleOnChange}
    />
  );
};

export default Input;
