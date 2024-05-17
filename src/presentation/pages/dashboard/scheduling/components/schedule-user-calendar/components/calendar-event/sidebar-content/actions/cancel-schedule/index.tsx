import { useState } from "react";

import { FormHandler, Textarea, Icon } from "infinity-forge";

import { RemoteChangeStatus } from "@/data";
import { container, patientTypes } from "@/container";
import {
  PermissionItem,
  useConfigurations,
  useLoadAllScheduleStatuses,
} from "@/presentation";

import { SelectReason } from "./select-reason";
import { ActionSchedule } from "../interface";

import * as S from "./styles";

export function CancelSchedule({ event, onExecuteAction }: ActionSchedule) {
  const [showForm, setShowForm] = useState(false);
  const [disableObservation, setDisableObservation] = useState(false);

  const { toast } = useConfigurations();
  const scheduleStatuses = useLoadAllScheduleStatuses();

  async function handleSuccess(data, handlers) {
    if (!data.reasonId || data.reasonId.length === 0) {
      handlers.setFieldError("reasonId", "Por favor selecione o motivo");
      return;
    }

    const statusId = scheduleStatuses.data.find(
      (status) => status.type === "CANC"
    ).id;

    const payload = {
      statusId,
      scheduleId: event.event.id,
      reasonId: data.reasonId[0],
      observation: data.observation,
    };

    await container
      .get<RemoteChangeStatus>(patientTypes.RemoteChangeStatus)
      .change(payload);

    toast.success("Cancelado com sucesso!", {
      position: "top-right",
      autoClose: 3000,
    });

    onExecuteAction();
  }

  return (
    <PermissionItem hash="AGE03">
      <S.CancelSchedule>
        <button
          type="button"
          className="reset-button"
          onClick={() => setShowForm(true)}
        >
          <Icon name="CloseIcon" />
          <span>Cancelar agendamento</span>
        </button>

        {showForm && (
          <FormHandler
            button={{ text: "Cancelar" }}
            initialData={{ reasonId: [] }}
            onSucess={handleSuccess}
          >
            <SelectReason setDisableObservation={setDisableObservation} />

            <Textarea name="observation" placeholder="Observação" />
          </FormHandler>
        )}
      </S.CancelSchedule>
    </PermissionItem>
  );
}
