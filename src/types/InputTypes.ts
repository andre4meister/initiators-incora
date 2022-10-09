import { ChangeEvent } from 'react';
import { UIPropsType } from './CommonTypes';

export interface InputType extends Partial<UIPropsType> {
  value: string;
  type: 'email' | 'text' | 'password';
  handleOnChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
}
