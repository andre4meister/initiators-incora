import { FC } from "react";
import { InputType } from "../../types/InputTypes";

const Input: FC<InputType> = ({ classes, handleOnChange, type, required }) => {
  return (
    <>
      <input type={type} required={required} className={classes} onChange={(e) => handleOnChange(e.target.value)} />
    </>
  );
};
export default Input;
