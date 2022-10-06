export interface InputType {
  classNames: string;
  onInputChange: (inputValue: string) => void;
  type: "email" | "text" | "password";
  required?: boolean;
}
