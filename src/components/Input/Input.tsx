import cn from 'classnames';
import { FC } from 'react';
import { InputType } from '../../types/InputTypes';
import styles from './Input.module.scss';

const Input: FC<InputType> = ({
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
);
export default Input;
