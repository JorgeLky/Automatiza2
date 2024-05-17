import { LoaderCircle } from "@/presentation";

import * as S from "./styles";

export function LoaderInput() {
  return (
    <S.LoaderInput>
      <LoaderCircle size={20} color="#666" />
    </S.LoaderInput>
  );
}
