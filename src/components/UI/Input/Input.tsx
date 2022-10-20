import { FC } from 'react';
import { InputType } from '../../../types/InputTypes';
import styles from './Input.module.scss';

const Input: FC<InputType> = ({
  type,
  name,
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
    className={styles.input}
    onChange={handleOnChange}
  />
);

export default Input;
