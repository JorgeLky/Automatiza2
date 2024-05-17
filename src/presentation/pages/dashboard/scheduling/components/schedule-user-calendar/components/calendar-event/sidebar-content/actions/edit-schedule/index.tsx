import moment from "moment";
import { Icon } from "semantic-ui-react";

import {
  useScheduling,
  useLoadSchedulesPatients,
  useLoadAllPatientTutor,
  PermissionItem,
} from "@/presentation";

import { ActionSchedule } from "../interface";

export function EditSchedule({ event, scheduleUser }: ActionSchedule) {
  const setCreateSchedulingArgs = useScheduling(
    (state) => state.setCreateSchedulingArgs
  );

  const { data } = useLoadSchedulesPatients({});

  const tutors = useLoadAllPatientTutor({});

  return (
    <PermissionItem hash="AGE02">
      <button
        className="reset-button"
        type="button"
        onClick={() => {
          const itemToReschedule =
            process.env.client === "sancla"
              ? data?.find((item) => item.id === event.event.patient.id)
              : tutors?.data?.find(
                  (item) => item.id === event.event.patient.id
                );

          setCreateSchedulingArgs({
            event,
            type: "edit",
            scheduleUser,
            date: moment(event.start).add(3, "hours").toDate(),
            forceSelectUser: true,
            ...itemToReschedule,
          });
        }}
      >
        <Icon name="edit outline" />
        <span>Editar agendamento</span>
      </button>
    </PermissionItem>
  );
}
