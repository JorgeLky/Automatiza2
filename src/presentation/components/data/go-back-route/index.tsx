import ArrowBackIcon from "@mui/icons-material/ArrowBack";


import { Button } from "../button";

import * as S from "./styles";
import { useHistory } from "@/presentation/context/history/context";

export function GoBackRoute() {
  const { history, atualRoute, back } = useHistory();

  if (!history || history.length === 0 || history[0] === atualRoute) {
    return <></>;
  }

  return (
    <S.ButtonGoBack>
      <Button
        text="Voltar"
        icon={<ArrowBackIcon fontSize="large" color="error" />}
        variant="text"
        color="error"
        onClick={back}
      ></Button>
    </S.ButtonGoBack>
  );
}
