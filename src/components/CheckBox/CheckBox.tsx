import { FC } from "react";

interface CheckBoxProps {
  isChecked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export const CheckBox: FC<CheckBoxProps> = ({
  isChecked,
  onChange,
  ...rest
}) => {
  return (
    <input type="checkbox" checked={isChecked} onChange={onChange} {...rest} />
  );
};
