import { useEffect } from "react";

import { Select } from "infinity-forge";
import { useFormikContext } from "formik";

import {
  useLoadAllScheduleServicesGroups,
  useScheduling,
} from "@/presentation";

export function SelectServices() {
  const { data } = useLoadAllScheduleServicesGroups();
  const { initialValues, setFieldValue } = useFormikContext();
  const { type } = useScheduling((state) => state.createSchedulingArgs);

  const options = data?.reduce((reducer, result) => {
    return [
      ...reducer,
      {
        label: result.description,
        options: result.types.map((type) => ({
          value: type.id,
          label: type.description,
        })),
      },
    ];
  }, []);

  function setTimingService(value: string[]) {
    const selectedValue = data.find((item) =>
      item.types.find((type) => type.id === value[0])
    );
    const reserved_minutes = selectedValue?.types?.find(
      (type) => type.id === value[0]
    ).reserved_minutes;

    setFieldValue("duration", reserved_minutes);
  }

  const initialValue = initialValues["scheduleServiceTypeId"];

  useEffect(() => {
    if (data && Array.isArray(initialValue) && initialValue.length > 0) {
      setTimingService(initialValue);
    }
  }, [initialValue, data]);

  if (!data) {
    return <></>;
  }

  return (
    <Select
      isGroup
      disabled={type === "reschedule"}
      label="Serviço"
      name="scheduleServiceTypeId"
      placeholder="Serviço"
      options={options || []}
      onChangeSelect={setTimingService}
    />
  );
}
