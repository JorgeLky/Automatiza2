import { useFormContext } from "react-hook-form";

import { InputControl } from "../input-control";
import { makeRegisterName } from "../helpers/make-register-name";

import { InputProps } from "../interfaces";

export function Input(props: InputProps) {
  const { register } = useFormContext();

  const { listposition, name } = props;

  const registerName = makeRegisterName(listposition, name);

  const registerResult = register(registerName)

  return (
    <InputControl {...props}>
      <input
        id={name}
        {...registerResult}
        {...props}
      />
    </InputControl>
  );
}
