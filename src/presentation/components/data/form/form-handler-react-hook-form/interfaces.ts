import { ButtonProps } from "../../button/default/interfaces";
import { ICustomSubmitProps } from "./custom-submit";

export interface IFormHandler {
  ref?: any;
  onSucess?: (data) => void;
  schema?: any;
  button?: ButtonProps;
  children: React.ReactNode;
  onChangeForm?: (data: any) => void;
  initialData?: { [key: string]: any };
  customSubmit?: ICustomSubmitProps[]
  customComponentButton?: React.ReactNode;
}
