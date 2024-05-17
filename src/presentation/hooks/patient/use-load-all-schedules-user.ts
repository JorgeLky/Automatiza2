import { useQuery } from "react-query";

import { callApiOneTime } from "@/presentation";
import { container, patientTypes } from "@/container";
import {
  RemoteLoadAllSchedulesUser,
  RemoteLoadAllSchedulesUsersWeek,
} from "@/data";

export function useLoadAllSchedulesUser(to: string, from: string, lista_cancelados?: boolean) {
  async function fetcher() {
    const response = await container.get<RemoteLoadAllSchedulesUser>(patientTypes.RemoteLoadAllSchedulesUser).loadAll({ from, to, lista_cancelados });

    return response;
  }

  return useQuery({
    queryKey: "RemoteLoadAllSchedulesUser" + to + lista_cancelados,
    queryFn: fetcher,
    ...callApiOneTime,
  });
}

export function useLoadAllSchedulesUserWeek(
  to: string,
  from: string,
  users?: string[],
  lista_cancelados?: boolean
) {
  async function fetcher() {
    const response = await container
      .get<RemoteLoadAllSchedulesUsersWeek>(
        patientTypes.RemoteLoadAllSchedulesUsersWeek
      )
      .loadAll({ users, from, to, lista_cancelados });

    return response;
  }

  const refetchKeyWeekCalendar =
    "RemoteLoadAllSchedulesUserWeek" + to + from + users.map((u) => u) + lista_cancelados;

  const query = useQuery({
    queryKey: refetchKeyWeekCalendar,
    queryFn: fetcher,
    ...callApiOneTime,
    enabled: users && users.length > 0,
  });

  return { ...query, refetchKeyWeekCalendar };
}
