import { FC } from "react";
import { ButtonType } from "../types/ButtonTypes";

const Button: FC<ButtonType> = ({ classNames, onButtonClick, text }) => {
  return (
    <>
      <button className={classNames} onClick={() => onButtonClick()}>
        {text}
      </button>
    </>
  );
};
export default Button;
