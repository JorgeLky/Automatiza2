import { useFormContext } from "react-hook-form";
import { useMask } from "@react-input/mask";

import { InputControl } from "../input-control";
import { makeRegisterName } from "../helpers/make-register-name";

import { InputProps } from "../interfaces";
import { useEffect } from "react";

export function InputMask(props: { mask: string } & InputProps) {
  const { register, setValue, formState } = useFormContext();

  const { listposition, name, basePath } = props;

  const registerName = makeRegisterName(listposition, name, basePath);

  const registerResult = register(registerName);

  const inputRef = useMask({
    mask: props.mask,
    replacement: { _: /\d/ },
  });


  useEffect(() => {
    const initialValue = formState.defaultValues[registerName];
    if(initialValue) {
      inputRef.current.value = initialValue
      setValue(registerName, initialValue);
    }
  }, [])

  return (
    <InputControl {...props}>
      <input
        id={name}
        {...registerResult}
        placeholder={props.placeholder}
        onChange={() => {
          setValue(registerName, inputRef.current?.value.replace(/\D/g, ""));
        }}
        ref={inputRef}
      />
    </InputControl>
  );
}
