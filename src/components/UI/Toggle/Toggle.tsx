import { FC } from 'react';
import style from './Toggle.module.scss';

interface ToggleProps {
  isChecked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const Toggle: FC<ToggleProps> = ({ isChecked, onChange }) => (
  <label htmlFor="toggle" className={style.switch}>
    <input
      name="toggle"
      checked={isChecked}
      onChange={onChange}
      type="checkbox"
    />
    <span className={style.slider} />
  </label>
);

export default Toggle;
