import { FC, useState } from 'react';
import cn from 'classnames';
import { ColorModeType } from 'types/CommonTypes';
import { ButtonType } from '../../types/ButtonTypes';
import s from './Button.module.scss';

const Button: FC<ButtonType> = ({ handleOnClick, children }) => {
  const [colorMode, setColorMode] = useState<ColorModeType>('dark');

  return (
    <button
      type="button"
      className={cn({
        [s.button]: true,
        [s.buttonLight]: colorMode === 'light',
        [s.buttonDark]: colorMode === 'dark',
        [s.buttonPill]: false,
      })}
      onClick={() => handleOnClick()}
    >
      {children}
    </button>
  );
};

export default Button;
