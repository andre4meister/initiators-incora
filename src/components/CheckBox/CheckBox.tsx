import { FC } from 'react';
import style from './CheckBox.module.scss';

interface CheckBoxProps {
  isChecked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
}
const CheckBox: FC<CheckBoxProps> = ({ isChecked, onChange, label }) => (
  <label className={style.container}>
    {label}
    <input type="checkbox" checked={isChecked} onChange={onChange} />
    <span className={style.checkmark} />
  </label>
);

export default CheckBox;
