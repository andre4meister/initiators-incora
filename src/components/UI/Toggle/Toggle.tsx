/* eslint-disable jsx-a11y/label-has-associated-control */
import { FC } from 'react';
import style from './Toggle.module.scss';

export interface ToggleProps {
  isToggle: boolean;
  handleOnChange: () => void;
}

const Toggle: FC<ToggleProps> = ({ isToggle, handleOnChange }) => (
  <div>
    <input
      checked={isToggle}
      onChange={handleOnChange}
      className={style.switch_checkbox}
      id="switch-new"
      type="checkbox"
    />
    <label
      style={{ background: isToggle ? '#fec602' : '#c3cadc' }}
      className={style.switch_label}
      htmlFor="switch-new"
    >
      <span className={style.switch_button} />
    </label>
  </div>
);

export default Toggle;
