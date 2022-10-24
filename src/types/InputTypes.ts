import { ChangeEvent } from 'react';
import { UIPropsType } from './CommonTypes';

export type InputTypes = 'email' | 'text' | 'password';
export interface InputProps extends Partial<UIPropsType> {
  value: string;
  name?: string;
  type: InputTypes;
  handleOnChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
}
