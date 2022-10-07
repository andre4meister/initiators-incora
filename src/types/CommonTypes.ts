export interface UIPropsType {
  classes: string;
  children?: string | React.ReactNode;
  handleOnChange: (inputValue: string) => void;
}
