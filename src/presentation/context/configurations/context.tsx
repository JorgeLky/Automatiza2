import { createContext, useContext } from "react";

import { useQuery } from "react-query";
import { CircularProgress as MuiCircularProgress } from "@mui/material";

import { adminTypes, container } from "@/container";
import { LoadUrlsSearch } from "@/domain";
import { RemoteLoadUrlsSearch } from "@/data";
import { PagesProviderAutomatiza, callApiOneTime } from "@/presentation";

interface IConfigurationsContextType {
  configurations: { ipAddress: string } & LoadUrlsSearch.Model;
  toast: any;
  pagesProviderAutomatiza: PagesProviderAutomatiza;
}

const ConfigurationsContext = createContext({} as IConfigurationsContextType);

function ConfigurationsProvider({
  children,
  toast,
  pagesProviderAutomatiza,
}: {
  children: React.ReactNode;
  toast: any;
  pagesProviderAutomatiza: PagesProviderAutomatiza;
}) {
  const ipAddressQuery = useQuery({
    queryKey: "IpAddress",
    queryFn: () => {
      try {
        return fetch("https://api.ipify.org/")
          .then((res) => res.text())
          .then((res) => res);
      } catch {
        return null;
      }
    },
    ...callApiOneTime,
  });

  async function fetcher() {
    const useCase = await container
      .get<RemoteLoadUrlsSearch>(adminTypes.RemoteLoadUrlsSearch)
      .load({ url: process.env.SYSTEM_URL });

    return {
      ...useCase,
      ipAddress: ipAddressQuery.data,
    };
  }

  const { data, isFetching, error } = useQuery({
    queryKey: "RemoteLoadUrlsSearch",
    queryFn: fetcher,
    ...callApiOneTime,
    enabled: !!ipAddressQuery.isFetching,
  });

  return (
    <ConfigurationsContext.Provider
      value={{ configurations: data, toast, pagesProviderAutomatiza }}
    >
      {!isFetching && data ? (
        children
      ) : (
        <div
          style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MuiCircularProgress color="primary" />
        </div>
      )}
    </ConfigurationsContext.Provider>
  );
}

function useConfigurations() {
  const context = useContext(ConfigurationsContext);

  if (context === undefined) {
    throw new Error(
      "useConfigurations() must be used within a ConfigurationsProvider"
    );
  }
  return context;
}

export { ConfigurationsProvider, useConfigurations };
