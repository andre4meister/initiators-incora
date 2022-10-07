import { FC } from "react";
import style from "./Toggle.module.scss";

interface ToggleProps {
  isChecked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export const Toggle: FC<ToggleProps> = ({ isChecked, onChange }) => {
  return (
    <>
      <label className={style.switch}>
        <input checked={isChecked} onChange={onChange} type="checkbox" />
        <span className={style.slider}></span>
      </label>
    </>
  );
};
