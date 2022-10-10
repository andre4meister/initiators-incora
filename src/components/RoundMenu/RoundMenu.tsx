import React, { useState } from 'react';
import s from './RoundMenu.module.scss';
import { ColorModeType } from '../../types/CommonTypes';

const RoundMenu = () => {
  const [colorMode, setColorMode] = useState<ColorModeType>('light');
  return (
    <div className={s.roundMenuBody}>
      menu
    </div>
  );
};

export default RoundMenu;
