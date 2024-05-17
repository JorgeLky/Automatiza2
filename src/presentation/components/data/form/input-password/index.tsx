import { useFormContext } from "react-hook-form";

import { InputControl } from "../input-control";
import { makeRegisterName } from "../helpers/make-register-name";

import { InputProps } from "../interfaces";

export function InputPassword(props: InputProps) {
  const { register } = useFormContext();

  const { listposition, name } = props;

  const registerName = makeRegisterName(listposition, name);

  return (
    <InputControl {...props}>
      <input
        id={name}
        {...props}
        {...register(registerName)}
      />
    </InputControl>
  );
}
