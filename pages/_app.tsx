import "reflect-metadata";

import React from "react";
import dynamic from "next/dynamic";

import { ReactQueryDevtools } from "react-query/devtools";

import { QueryClient } from "react-query";

const QueryClientProvider = dynamic(
  () => import("react-query").then((e) => e.QueryClientProvider),
  {
    ssr: false,
  }
);
export const queryClient = new QueryClient();

import { ContainerAutomatizaLibProviders } from "../src";

import "semantic-ui-css/semantic.min.css";
import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css";
import "../src/presentation/styles/reset.css";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export default function App(props) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ContainerAutomatizaLibProviders
          toast={toast}
          pagesProviderAutomatiza={{
            agendamento: {
              CreatePatient: (props: any) => <div><button type="button" onClick={props.onSuccess}>CRIAR</button></div>,
              CreateTutor: (props: any) => <div><button type="button" onClick={props.onSuccess}>CRIAR</button></div>,
            },
          }}
        >
          <ToastContainer />
          <props.Component {...props.pageProps} />
        </ContainerAutomatizaLibProviders>

        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}
