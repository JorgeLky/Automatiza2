import moment from "moment";
import {
  Input,
  Select,
  Textarea,
  FormHandler,
} from "infinity-forge";

import {
  SelectHolder,
  SelectPatient,
  SelectServices,
  SelectReturnable,
  SelectRescheduleReason,
} from "./components";

import {
  useMe,
  useScheduling,
  DateToYYYYMMDD,
  useLoadAllSchedulesUser,
} from "@/presentation";
import { useSubmitSchedule } from "./handleSubmit";

import * as S from "./styles";

export function FormCreateScheduling() {
  const me = useMe();
  const { submit } = useSubmitSchedule()
  const selectedDate = useScheduling((state) => state.selectedDate);
  const { data } = useLoadAllSchedulesUser(DateToYYYYMMDD(selectedDate), DateToYYYYMMDD(selectedDate));
  const { scheduleUser, event, date, tutors, id, forceSelectUser, type } = useScheduling((state) => state.createSchedulingArgs);

  const initialData = {
    userId: scheduleUser?.id ? [scheduleUser?.id] : [],
    majorComplaint: event?.event?.major_complaint || "",
    scheduleServiceTypeId: event?.event?.serviceType
      ? [event?.event?.serviceType?.id]
      : [],
    holderId:
      process.env.client === "sancla"
        ? event?.event?.holder?.id
          ? [event?.event?.holder?.id || ""]
          : tutors?.find((tutor) => tutor.isMain)?.id
          ? [tutors?.find((tutor) => tutor.isMain)?.id || ""]
          : []
        : undefined,
    time: date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }),
    date: moment(date).format("YYYY-MM-DD"),
    patientId:
      process.env.client === "liftone"
        ? [event?.event?.patient?.id || id]
        : process.env.client === "sancla"
        ? id
          ? [id]
          : []
        : tutors?.find((tutor) => tutor.isMain)?.id
        ? [tutors?.find((tutor) => tutor.isMain)?.id || ""]
        : [],
  };

  const users = data?.map((user) => ({ label: user.name, value: user.id }));

  return (
    <S.FormCreateScheduling>
      <div className="top">
        <h2>{type === "reschedule" ? "Reagendamento" : type === "edit" ? "Alterar Agendamento" : "Criar agendamento"}</h2>
      </div>

      <FormHandler
        button={{ text: "Agendar" }}
        onSucess={submit}
        initialData={initialData}
        cleanFieldsOnSubmit={false}
      >
        {(forceSelectUser || !scheduleUser?.id) && (
          <Select name="userId" label="Usuário" options={users || []} />
        )}

        <div className="row">
          <SelectHolder />

          {process.env.client === "sancla" && <SelectPatient />}
        </div>

        <div className="row">
          <div style={{ width: "92%" }}>
            <SelectServices />

            <SelectReturnable />
          </div>


          <div style={{ width: "35%" }}>
            <Input
              type="number"
              name="duration"
              readOnly={
                !me?.data?.unit?.unitConfig?.allow_change_schedule_duration
              }
              label="Duração consulta (minutos)"
            />
          </div>
        </div>

        {type === "reschedule" && <SelectRescheduleReason />}

        <h3>Data e horário</h3>

        <div className="row">
          <Input type="date" name="date" readOnly={type === "edit"} />

          <Input type="time" name="time" readOnly={type === "edit"} />
        </div>

        <Textarea name="majorComplaint" label="Principal queixa" />
      </FormHandler>
    </S.FormCreateScheduling>
  );
}
