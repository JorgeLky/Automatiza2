import { useFormContext } from "react-hook-form";
import { Checkbox, FormControlLabel } from "@mui/material";

import { ErrorMessage } from "../input-control/error";

import { InputProps } from "../interfaces";

import * as S from "./styles"

export function InputCheckbox(props: InputProps) {
  const { watch, setValue } = useFormContext();

  const { name } = props;

  const value = watch(name);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(name, event.target.checked);
  };

  return (
    <S.InputCheckbox>
      <FormControlLabel
        label={props.label}
        control={<Checkbox checked={value} onChange={handleChange} />}
      />

      <ErrorMessage {...props} />
    </S.InputCheckbox>
  );
}
