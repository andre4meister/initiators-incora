import { ChangeEvent } from 'react';

export interface UIPropsType {
  classes?: string;
  children?: string | React.ReactNode;
}
export type InputTypes = 'email' | 'text' | 'password';

export interface InputProps extends Partial<UIPropsType> {
  value: string;
  name?: string;
  type: InputTypes;
  autofill?: boolean;
  handleOnChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
}

export interface ButtonType extends Partial<UIPropsType> {
  handleOnClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}
