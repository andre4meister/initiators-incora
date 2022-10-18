import cn from 'classnames';
import { FC } from 'react';
import { InputType } from '../../../types/InputTypes';
import s from './Input.module.scss';

const Input: FC<InputType> = ({
  type,
  name,
  forStorybook = false,
  colorMode = 'light',
  classes,
  handleOnChange,
  required,
  placeholder,
  value,
}) => (
  <input
    name={name}
    placeholder={placeholder}
    value={value}
    type={type}
    required={required}
    className={cn({
      [s.input]: true,
      [s.inputLight]: colorMode === 'light' && forStorybook,
      [s.inputDark]: colorMode === 'dark' && forStorybook,
    })}
    onChange={handleOnChange}
  />
);

export default Input;
