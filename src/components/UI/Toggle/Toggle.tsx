import { FC } from 'react';
import style from './Toggle.module.scss';

interface ToggleProps {
  isToggle: boolean;
  onChange: () => void;
}

const Toggle: FC<ToggleProps> = ({ isToggle, onChange }) => (
  <div>
    <input
      checked={isToggle}
      onChange={onChange}
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
