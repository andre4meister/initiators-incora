export interface UIPropsType {
  classes?: string;
  children?: string | React.ReactNode;
  colorMode?: ColorModeType;
  forStorybook?: boolean;
}
export type ColorModeType = 'light' | 'dark';
