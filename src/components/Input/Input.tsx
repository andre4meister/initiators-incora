import cn from 'classnames';
import { FC, useState } from 'react';
import { ColorModeType } from 'types/CommonTypes';
import { InputType } from '../../types/InputTypes';
import s from './Input.module.scss';

const Input: FC<InputType> = ({
  type,
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
      placeholder={placeholder}
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

export default Input;
