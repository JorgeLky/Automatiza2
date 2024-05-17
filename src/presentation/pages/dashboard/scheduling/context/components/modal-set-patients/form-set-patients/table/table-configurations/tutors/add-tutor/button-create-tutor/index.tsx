import { useState } from "react";

import {
  Modal,
  Button,
  PermissionItem,
  useConfigurations,
} from "@/presentation";

export function ButtonCreateTutor({ refetch, setInitialHolder }: any) {
  const [visible, setVisible] = useState(false);

  const { pagesProviderAutomatiza } = useConfigurations();

  async function onSuccess(data) {
    await refetch()
    setInitialHolder(data.id)
  }

  const CreateTutor = pagesProviderAutomatiza.agendamento.CreateTutor;

  return (
    <PermissionItem hash={"TUT01" || "PET01"}>
      {visible && (
        <Modal stateModal={visible} maxwidth="1200px" setModal={setVisible}>
          <CreateTutor
            onSuccess={onSuccess}
            isSchedule
            setVisible={setVisible}
          />
        </Modal>
      )}

      <Button
        text="Novo Tutor"
        type="button"
        onClick={() => setVisible(true)}
      />
    </PermissionItem>
  );
}

//
