import { FC } from "react";

interface CheckBoxProps {
  isChecked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export const CheckBox: FC<CheckBoxProps> = ({ isChecked, onChange }) => {
  return <input type="checkbox" checked={isChecked} onChange={onChange} />;
};
