import { useRouter } from "next/router";

import { Storage } from "@/infra";
import { RemoteBusinessUnits } from "@/data";
import { InfraTypes, adminTypes, container } from "@/container";

import {
  Error,
  InputRadio,
  FormHandler,
  useAuthAdmin,
  useConfigurations,
  useLoadUsersController,
} from "@/presentation";

import * as S from "./styles";

export function SwapForm() {
  const { user } = useAuthAdmin();
  const { configurations } = useConfigurations();

  const { data } = useLoadUsersController();

  const userClinicas =
    data && data.length > 0
      ? data?.find((u) => {
          return u.id === user?.userID;
        }).units
      : [];

  const router = useRouter();

  async function onSucess(data) {
    await container.get<RemoteBusinessUnits>(adminTypes.RemoteBusinessUnits).swap({ unitId: data.id });

    const payload = {
      token: user?.token?.token,
      logged: true,
      systemConfig: {
        id: configurations?.id,
        url: configurations?.url,
        active: true,
        system: {
          id: configurations?.system.id,
          name: configurations?.system.name,
        },
      },
    };

    container.get<Storage>(InfraTypes.storage).set("JB$S", payload);

    router.push("/dashboard");
  }

  return (
    <Error name="swap-form">
      <S.SwapForm>
        <FormHandler button={{ text: "Trocar" }} onSucess={onSucess}>
          <h4>Trocar unidade</h4>

          <InputRadio
            name="id"
            inputs={userClinicas?.map((item) => ({
              value: item.id,
              label: item.identification,
            }))}
          />
        </FormHandler>
      </S.SwapForm>
    </Error>
  );
}
