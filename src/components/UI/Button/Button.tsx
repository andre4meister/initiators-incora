/* eslint-disable react/button-has-type */
import { FC } from 'react';
import cn from 'classnames';
import { ButtonType } from '../../../types/typesForUI';
import styles from './Button.module.scss';

const Button: FC<ButtonType> = ({
  handleOnClick,
  children,
  classes,
  type,
  disabled = false,
}) => (
  <button
    disabled={disabled}
    type={type}
    className={cn(styles.button, classes)}
    onClick={handleOnClick}
  >
    {children}
  </button>
);

export default Button;
