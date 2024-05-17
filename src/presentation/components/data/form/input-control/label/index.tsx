import { ILabelProps } from "./interfaces";

import * as S from "./styles";

export function Label({ inputId, label }: ILabelProps) {
  return (
    <S.Label>
      <label htmlFor={inputId} className="font-12-bold">
        {label}
      </label>
    </S.Label>
  );
}
