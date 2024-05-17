import { useState } from "react";

import moment from "moment";
import { Icon } from "semantic-ui-react";
import { FormHandler, Input, Textarea } from "infinity-forge";

import { BadRequestError } from "@/domain";
import { container, patientTypes } from "@/container";
import { RemoteChangeStatus, RemoteSchedule } from "@/data";
import {
  PermissionItem,
  useConfigurations,
  useLoadAllScheduleStatuses,
} from "@/presentation";

import { ActionSchedule } from "../interface";

import * as S from "./styles";

export function ConfirmSchedule({ event, onExecuteAction }: ActionSchedule) {
  const [showForm, setShowForm] = useState(false);

  const { toast } = useConfigurations();
  const scheduleStatuses = useLoadAllScheduleStatuses();

  async function handleSuccess(data) {
    const statusNotConfirmedId = scheduleStatuses.data.find(
      (status) => status.type === "AN"
    ).id;
    const statusId = scheduleStatuses.data.find(
      (status) => status.type === "AC"
    ).id;

    const body = {
      ...data,
      contactDate: moment(`${data.contactDate}`).format("YYYY-MM-DDTHH:mm:ssZ"),
      scheduleId: event.event.id,
      statusId: statusNotConfirmedId,
    };

    try {
      await container
        .get<RemoteSchedule>(patientTypes.RemoteSchedule)
        .confirm(body);

      await container
        .get<RemoteChangeStatus>(patientTypes.RemoteChangeStatus)
        .change({
          scheduleId: event.event.id,
          statusId,
        });

      onExecuteAction();

      toast.success("Agendamento confirmado!", {
        autoClose: 4000,
        position: "top-right",
      });

      setShowForm(false);
    } catch (e) {
      if (e instanceof BadRequestError) {
        toast.error(e.error.message, {
          autoClose: 4000,
          position: "top-right",
        });
      }
    }
  }

  return (
    <PermissionItem hash="AGE05">
      <S.ConfirmSchedule>
        <button
          className="reset-button orange"
          type="button"
          onClick={() => setShowForm(true)}
        >
          <Icon name="calendar alternate outline" />
          <span>Confirmar agendamento</span>
        </button>

        {showForm && (
          <FormHandler
            button={{ text: "Confirmar" }}
            onSucess={handleSuccess}
            initialData={{ contactDate: moment().format("YYYY-MM-DDTHH:mm") }}
          >
            <Input type="datetime-local" name="contactDate" />

            <Textarea name="observation" placeholder="Observação" />
          </FormHandler>
        )}
      </S.ConfirmSchedule>
    </PermissionItem>
  );
}
