import { FC } from "react";
import { InputType } from "../types/InputTypes";

const Input: FC<InputType> = ({ classNames, onInputChange, type, required }) => {
  return (
    <>
      <input type={type} required={required} className={classNames} onChange={(e) => onInputChange(e.target.value)} />
    </>
  );
};
export default Input;
