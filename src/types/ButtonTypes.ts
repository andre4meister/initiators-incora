import { UIPropsType } from './CommonTypes';

export interface ButtonType extends Partial<UIPropsType> {
  handleOnClick: () => void;
  type: 'button' | 'submit' | 'reset';
}
