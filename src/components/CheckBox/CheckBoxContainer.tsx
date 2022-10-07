import { useState } from "react";
import { Toggle } from "../Toggle/Toggle";
import { CheckBox } from "./CheckBox";

//temprorary component for checking propriate work

export const CheckBoxContainer = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isToggled, setIsToggled] = useState<boolean>(false);
  const onCheckBoxChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };
  const onToggleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsToggled(e.target.checked);
  };

  return (
    <>
      <CheckBox isChecked={isChecked} onChange={onCheckBoxChangeHandler} />
      <Toggle isChecked={isToggled} onChange={onToggleChangeHandler} />
    </>
  );
};
