import cn from 'classnames';
import { FC } from 'react';
import { ButtonType } from '../../types/ButtonTypes';

import styles from './Button.module.scss';

const Button: FC<ButtonType> = ({ classes, handleOnClick, children }) => (
  <button onClick={handleOnClick} type="button" className={cn(styles.button, classes)}>
    {children}
  </button>
);

export default Button;
