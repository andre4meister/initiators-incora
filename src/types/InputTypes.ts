import { UIPropsType } from "./CommonTypes";

export interface InputType extends UIPropsType {
  type: "email" | "text" | "password";
  required?: boolean;
}
