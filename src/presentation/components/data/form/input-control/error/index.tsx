import { useCallback } from "react";
import { GlobalError, useFormContext } from "react-hook-form";

import { InputProps } from "../../interfaces";

import * as S from "./styles";

export function ErrorMessage({ name, basePath, listposition }: InputProps) {
  const { formState } = useFormContext();

  const getErrorMessage = useCallback(() => {

    if(basePath && formState.errors && typeof listposition === "number") {
        const getErrorStruture: any = formState.errors[basePath]

        if(getErrorStruture) {
          const itemInList = getErrorStruture[listposition];

          if(itemInList) {
            return itemInList[name];
          }
        }

        return ""
    }

    const errorPath = formState.errors[name];

    const fieldIsPartOfListValidations = listposition !== undefined && Array.isArray(errorPath);

    const path: GlobalError = fieldIsPartOfListValidations ? errorPath[listposition] : errorPath;

    return path?.message;
  }, [formState.errors]);

  const errorMessage = getErrorMessage()

  if (!errorMessage) {
    return <></>;
  }

  return (
    <S.ErrorMessage className="error-message">
      <span className="font-12-medium">{errorMessage}</span>
    </S.ErrorMessage>
  );
}
