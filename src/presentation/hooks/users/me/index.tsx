import { useQuery } from "react-query";

import { AxiosHttpClient, CookieStorageAdapter } from "@/infra";
import { AuthorizeDashboardHttpClientDecorator } from "@/container/decorators";
import { callApiOneTime } from "@/presentation/utils";

export function useMe() {
  return useQuery({
    queryKey: ["Me"],
    queryFn: async () => {
      const response = await new AuthorizeDashboardHttpClientDecorator(
        new CookieStorageAdapter(),
        new AxiosHttpClient()
      ).request({
        method: "get",
        url: `${process.env.NEXT_PUBLIC_API}/auth/me`,
      });

      return response.body as {
        cl: string[];
        unit: { unitConfig: { interval: number, allow_change_schedule_duration?: boolean } };
      };
    },
    ...callApiOneTime,
  });
}
