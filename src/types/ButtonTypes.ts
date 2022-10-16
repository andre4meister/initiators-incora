import { UIPropsType, ColorModeType } from './CommonTypes';

export interface ButtonType extends Partial<UIPropsType> {
  handleOnClick: () => void;
}
