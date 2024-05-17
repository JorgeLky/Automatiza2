import { Icon } from "infinity-forge";

import { RemoteChangeStatus } from "@/data";
import { container, patientTypes } from "@/container";
import {
  PermissionItem,
  useConfigurations,
  useLoadAllScheduleStatuses,
} from "@/presentation";

import { ActionSchedule } from "../interface";

import * as S from "./styles";

export function InformCustomerArrival({
  event,
  onExecuteAction,
}: ActionSchedule) {
  const { toast } = useConfigurations();
  const scheduleStatuses = useLoadAllScheduleStatuses();

  async function handleClick() {
    const statusId = scheduleStatuses.data.find(
      (status) => status.type === "REC"
    ).id;

    await container
      .get<RemoteChangeStatus>(patientTypes.RemoteChangeStatus)
      .change({
        scheduleId: event.event.id,
        statusId,
      });

    onExecuteAction();

    toast.success("informado com sucesso!", {
      autoClose: 4000,
      position: "top-right",
    });
  }

  return (
    <PermissionItem hash="AGE06">
      <S.InformCustomerArrival>
        <button type="button" onClick={handleClick}>
          <Icon name="IconUser" />
          Informar chegada do cliente
        </button>
      </S.InformCustomerArrival>
    </PermissionItem>
  );
}
