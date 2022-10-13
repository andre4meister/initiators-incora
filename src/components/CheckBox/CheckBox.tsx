import { FC } from 'react';

interface CheckBoxProps {
  isChecked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const CheckBox: FC<CheckBoxProps> = ({ isChecked, onChange }) => (
  <input type="checkbox" checked={isChecked} onChange={onChange} />
);

export default CheckBox;
