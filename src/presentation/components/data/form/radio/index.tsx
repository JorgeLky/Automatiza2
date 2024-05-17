import { useFormContext } from "react-hook-form";
import { Radio, FormControlLabel, RadioGroup } from "@mui/material";

import { ErrorMessage } from "../input-control/error";

import { InputProps } from "../interfaces";

import * as S from "./styles";

export function InputRadio(
  props: { inputs: { label: string; value: string }[] } & InputProps
) {
  const { watch, setValue } = useFormContext();

  const { name } = props;

  const value = watch(name);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(name, event.target.value);
  };

  return (
    <S.InputRadio>
      <RadioGroup name={name} value={value} onChange={handleChange}>
        {props.inputs.map((input) => (
          <FormControlLabel
            key={input.value}
            value={input.value}
            control={<Radio size="small" />}
            label={input.label}
          />
        ))}
      </RadioGroup>

      <ErrorMessage {...props} />
    </S.InputRadio>
  );
}
