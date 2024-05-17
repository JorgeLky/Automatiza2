import { scheduleStore } from "./store";
import {
  Event,
  LoadSchedulesPatient,
  OpportunitieSchedule,
  SchedulePatient,
  ScheduleUser,
} from "@/domain";

export type ScheduleParams =
  | ({
      date: Date;
      event?: Event;
      forceSelectUser?: boolean;
      scheduleUser: ScheduleUser;
      type: "reschedule" | "create" | "edit",
    } & Partial<SchedulePatient>)
  | null;

type ScheduleStoreProps = {
  selectedDate?: Date;
  listCancelledEvents?: boolean;
  modalPatients?: ScheduleParams;
  createSchedulingArgs?: ScheduleParams;
  oppotunities?:  OpportunitieSchedule[] | null;
  patientsFilters?: LoadSchedulesPatient.Params | null;
};

interface ScheduleStoreState extends ScheduleStoreProps {
  changeDate: (date: string | Date) => void;
  setModalPatients: (params: ScheduleParams) => void;
  setCreateSchedulingArgs: (params: ScheduleParams) => void;
  setOpportunities: (value: OpportunitieSchedule[] | null) => void;
  setRemovedCancelledEvents: (listCancelledEvents: boolean) => void
  setPatientsFilters: (filters: LoadSchedulesPatient.Params | null) => void;
}

type ScheduleStoreType = ReturnType<typeof scheduleStore>;

export type { ScheduleStoreProps, ScheduleStoreState, ScheduleStoreType };
