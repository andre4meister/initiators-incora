/* eslint-disable jsx-a11y/label-has-associated-control */
import { FC } from 'react';
import style from './CheckBox.module.scss';

export interface CheckBoxProps {
  isChecked: boolean;
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
}
const CheckBox: FC<CheckBoxProps> = ({ isChecked, handleOnChange, label }) => (
  <label htmlFor="checkbox" className={style.container}>
    {label}
    <input id="checkbox" type="checkbox" checked={isChecked} onChange={handleOnChange} />
    <span className={style.checkmark} />
  </label>
);

export default CheckBox;
