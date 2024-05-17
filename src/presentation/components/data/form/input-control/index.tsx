import { Error } from "@/presentation";

import { Label } from "./label";
import { ErrorMessage } from "./error";
import { LoaderInput } from "./loader-input";

import { InputProps } from "../interfaces";

import * as S from "./styles";

export function InputControl({
  name,
  label,
  loading,
  children,
  basePath,
  listposition,
}: InputProps) {
  return (
    <Error name={`input-control-${name}`}>
      <S.InputControl $loading={loading}>
        {label && <Label inputId={name} label={label} />}

        <div className="input-content">
          {loading && <LoaderInput  />}

          <div>{!loading && children}</div>
        </div>

        <ErrorMessage name={name} basePath={basePath} listposition={listposition} />
      </S.InputControl>
    </Error>
  );
}
