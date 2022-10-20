import { FC } from 'react';
import { ButtonType } from '../../../types/ButtonTypes';
import styles from './Button.module.scss';

const Button: FC<ButtonType> = ({ handleOnClick, children }) => (
  <button
    type="button"
    className={styles.button}
    onClick={() => handleOnClick()}
  >
    {children}
  </button>
);

export default Button;
