import { UIPropsType } from './CommonTypes';

export interface ButtonType extends Partial<UIPropsType> {
  handleOnClick: () => void;
  disabled?: boolean;
}
