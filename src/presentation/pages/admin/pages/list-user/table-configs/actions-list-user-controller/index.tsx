import { useState } from "react";

import {
  ButtonEdit,
  useAuthAdmin,
  ButtonDelete,
  useDeleteUserController,
} from "@/presentation";
import { FormUserController } from "../../components";

export function ActionsListUserController(props) {
  const [modal, setModal] = useState(false);
  const { mutateAsync, isLoading } = useDeleteUserController(props.id);

  const { user } = useAuthAdmin();

  const isActualUser = props.id === user?.userID;

  return (
    <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
      {modal && (
        <FormUserController
          modal={modal}
          setModal={setModal}
          userController={props}
        />
      )}

      <ButtonEdit onClick={() => setModal(true)} />

      {!isActualUser && (
        <ButtonDelete onClick={() => mutateAsync()} disabled={isLoading} />
      )}
    </div>
  );
}
