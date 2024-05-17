import { Select } from "infinity-forge";

import { useLoadAllScheduleStatuses } from "@/presentation";
import { Option } from "./option";
import { StylesConfig } from "react-select";

export function SelectScheduleStatuses() {
  const scheduleStatuses = useLoadAllScheduleStatuses();

  if (!scheduleStatuses) {
    return;
  }

  const customStyles: StylesConfig = {
    input: (provided) => ({
      ...provided,
      position: "absolute",
    }),
  };

  return (
    <Select
      label="Status"
      name="scheduleStatusId"
      placeholder="Status do agendamento"
      CustomOption={(props) => <Option {...props} />}
      customStlyes={customStyles as any}
      options={
        scheduleStatuses?.data?.map((status) => ({
          label: status.description,
          value: status.id,
          color: status.color,
        })) || []
      }
    />
  );
}
