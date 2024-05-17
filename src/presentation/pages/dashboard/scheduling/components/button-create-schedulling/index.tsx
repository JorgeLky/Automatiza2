import { Button, PermissionItem, useScheduling } from "@/presentation";

export function ButtonCreateSchedulling() {
  const setModalPatients = useScheduling((state) => state.setModalPatients);

  return (
    <PermissionItem hash="AGE01">
      <Button
        text="Agenda horário alternativo"
        variant="outlined"
        type="button"
        className="active"
        onClick={() =>
          setModalPatients({
            date: new Date(),
            scheduleUser: undefined,
            type: "create",
          })
        }
      />
    </PermissionItem>
  );
}
