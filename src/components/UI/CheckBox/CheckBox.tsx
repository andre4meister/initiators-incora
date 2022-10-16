import { FC } from 'react';
import style from './CheckBox.module.scss';

export interface CheckBoxProps {
  isChecked: boolean;
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
}
const CheckBox: FC<CheckBoxProps> = ({ isChecked, handleOnChange, label }) => (
  <label className={style.container}>
    {label}
    <input type="checkbox" checked={isChecked} onChange={handleOnChange} />
    <span className={style.checkmark} />
  </label>
);

export default CheckBox;
