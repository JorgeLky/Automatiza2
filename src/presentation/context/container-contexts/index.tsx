import React from "react";
import { AuthAdminProvider } from "../auth-admin";
import { ConfigurationsProvider } from "../configurations/context";
import { ThemeProvider } from "../theme";
import { HistoryProvider } from "../history/context";

import { LoaderOnRouteChange } from "../route-loading";

export type PagesProviderAutomatiza = {
  agendamento: {
    CreateTutor: (props: { setVisible: React.Dispatch<React.SetStateAction<boolean>>, onSuccess: (res: any) => void , isSchedule: boolean }) => JSX.Element;
    CreatePatient: (props: { setVisible: React.Dispatch<React.SetStateAction<boolean>>, onSuccess: (res: any) => void }) => JSX.Element;
  };
};

export function ContainerAutomatizaLibProviders({
  toast,
  children,
  pagesProviderAutomatiza,
}: {
  toast: any;
  children: React.ReactNode;
  pagesProviderAutomatiza: PagesProviderAutomatiza;
}) {
  return (
    <ThemeProvider>
      <HistoryProvider>
        <ConfigurationsProvider toast={toast} pagesProviderAutomatiza={pagesProviderAutomatiza}>
          <AuthAdminProvider>
            <LoaderOnRouteChange>{children}</LoaderOnRouteChange>
          </AuthAdminProvider>
        </ConfigurationsProvider>
      </HistoryProvider>
    </ThemeProvider>
  );
}
