import { Button } from "../../../button";
import { ButtonProps } from "../../../button/default/interfaces";

export type ICustomSubmitProps = {
  props: ButtonProps;
  action: (data: any) => void;
};

export function CustomSubmitButton({
  props,
  action,
  stateForm,
  onSubmit,
}: {
  onSubmit: (action) => void;
  stateForm: {
    state: string;
    message: string;
  };
} & ICustomSubmitProps) {
  return (
    <Button {...props} type="button" onClick={() => onSubmit(action)} loading={stateForm.state === "loading"} />
  );
}
