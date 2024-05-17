export type ScheduleServiceItem = {
    id: string;
    economic_group_id: null;
    description: string;
    active: boolean;
    type: "RETORNO";
    types: {
      id: string;
      schedule_service_group_id: string;
      economic_group_id: null;
      description: string;
      reserved_minutes: number;
      active: boolean;
      allow_return: boolean;
      resume: string;
    }[];
  };

export type LoadAllScheduleServicesGroups = {
  loadAll: (params: LoadAllScheduleServicesGroups.Params) => Promise<LoadAllScheduleServicesGroups.Model>;
};

export namespace LoadAllScheduleServicesGroups {
  export type Params = {
    description?: string;
  };

  export type Model = ScheduleServiceItem[];
}
