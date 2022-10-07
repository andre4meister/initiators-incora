import { FC } from "react";
import { ButtonType } from "../types/ButtonTypes";

const Button: FC<ButtonType> = ({ classes, handleOnClick, children }) => {
  return (
    <>
      <button className={classes} onClick={() => handleOnClick()}>
        {children}
      </button>
    </>
  );
};
export default Button;
