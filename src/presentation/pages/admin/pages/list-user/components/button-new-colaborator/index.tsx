import { useState } from "react";

import { Button } from "@/presentation";
import { FormUserController } from "../form-collaborator";

import * as S from "./styles";

export function ButtonNewCollaborator() {
  const [modal, setModal] = useState(false);

  return (
    <>
      <FormUserController modal={modal} setModal={setModal} />

      <S.ButtonNewCollaborator>
        <Button
          text="Cadastrar"
          type="button"
          onClick={() => setModal(true)}
        />
      </S.ButtonNewCollaborator>
    </>
  );
}
