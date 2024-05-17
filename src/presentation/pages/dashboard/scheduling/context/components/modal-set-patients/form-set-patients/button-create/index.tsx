import { useState } from "react";
import { useQueryClient } from "react-query";

import {
  Button,
  Modal,
  PermissionItem,
  useConfigurations,
} from "@/presentation";

import * as S from "./styles";

export function ButtonCreate({ patientFilters }) {
  const [visible, setVisible] = useState(false);

  const { pagesProviderAutomatiza } = useConfigurations();

  const queryClient = useQueryClient();

  const props = {
    setVisible,
    isSchedule: true,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["RemoteLoadAllPatientTutor", patientFilters],
      });
      queryClient.invalidateQueries({
        queryKey: ["RemoteLoadSchedulesPatients", patientFilters],
      });
    },
  };

  const CreateTutor = pagesProviderAutomatiza.agendamento.CreateTutor;
  const CreatePatient = pagesProviderAutomatiza.agendamento.CreatePatient;

  return (
    <PermissionItem hash={"PET01" || "TUT01"}>
      <S.ButtonCreate>
        {visible && (
          <Modal stateModal={visible} maxwidth="1200px" setModal={setVisible}>
            {process.env.client === "sancla" ? (
              <CreatePatient {...props} />
            ) : (
              <CreateTutor {...props} />
            )}
          </Modal>
        )}

        <Button
          text="Cadastrar novo paciente"
          type="button"
          onClick={() => setVisible(true)}
        />
      </S.ButtonCreate>
    </PermissionItem>
  );
}
