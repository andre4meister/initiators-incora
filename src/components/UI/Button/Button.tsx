import { FC, useState } from 'react';
import cn from 'classnames';
import { ButtonType } from '../../../types/ButtonTypes';
import s from './Button.module.scss';

const Button: FC<ButtonType> = ({
  handleOnClick,
  children,
  forStorybook = false,
  colorMode = 'light',
}) => (
  <button
    type="button"
    className={cn({
      [s.button]: true,
      [s.buttonLight]: colorMode === 'light' && forStorybook,
      [s.buttonDark]: colorMode === 'dark' && forStorybook,
      [s.buttonPill]: false,
    })}
    onClick={() => handleOnClick()}
  >
    {children}
  </button>
);

export default Button;
