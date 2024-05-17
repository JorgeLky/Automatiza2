import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { useAuthAdmin, useConfigurations } from "../context";
import { InfraTypes, container } from "@/container";

import { Storage } from "@/infra";
import axios from "axios";

export function ValidateThirdPartyToken() {
  const router = useRouter();

  const { configurations } = useConfigurations();

  const { setUser } = useAuthAdmin();

  useQuery({
    queryKey: ["validarToken", router.query.token],
    queryFn: async () => {
      try {
        const token = router.query.token as string;

        const response = await axios.get<{
          user: { id: string; type: "controller" | "user" };
        }>(process.env.NEXT_PUBLIC_API + "/auth/me", {
          headers: { Authorization: "Bearer " + token },
        });
  
        if (response.data.user.type === "user") {
          const payload = {
            token,
            logged: true,
            isThirdParty: true,
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
  
          container.get<Storage>(InfraTypes.storage).set("adminUser", null);
          container.get<Storage>(InfraTypes.storage).set("JB$S", payload);
  
          router.push("/dashboard");
        } else {
          const payloadAdminUser = {
            userType: "controller",
            isThirdParty: true,
            userID: response.data.user.id,
            token: { token, type: "bearer" },
            units: [],
          } as any;
  
          container.get<Storage>(InfraTypes.storage).set("JB$S", null);
  
          container.get<Storage>(InfraTypes.storage).set("adminUser", {
            value: payloadAdminUser,
          });
  
          setUser(payloadAdminUser);
          router.push("/admin");
        }
      }catch {
        router.push("/")
      }
    },
    enabled: !(
      router.query.isReady &&
      !!router.query.token &&
      configurations.system
    ),
  });

  return <></>;
}
