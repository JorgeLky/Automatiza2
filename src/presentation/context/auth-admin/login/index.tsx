import Link from "next/link";

import { useAuthAdmin } from "../context";

import {
  Error,
  useConfigurations,
} from "@/presentation";

import { FormHandler, Input, InputPassword } from "infinity-forge"

import * as S from "./styles";

export function Login() {
  const { signIn } = useAuthAdmin();
  const { configurations } = useConfigurations();

  return (
    <Error name="login">
      <S.Login>
        <div className="form-login">
          <FormHandler
            button={{ text: "ENTRAR" }}
            onSucess={(data) =>
              signIn({
                ...data,
                system: configurations.system.name,
                ipAddress: configurations.ipAddress,
              })
            }
          >
            <h3>Painel do franqueador</h3>
            <Input type="email" name="email" label="Email" />
            <InputPassword name="password" label="Senha" />
          </FormHandler>

          <div className="link-area-franqueado">
            <Link href="/" passHref>
              <a href="">Área do franqueado</a>
            </Link>
          </div>
        </div>
      </S.Login>
    </Error>
  );
}
