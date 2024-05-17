import { Storage } from "@/infra";
import { InfraTypes, container, useAuthAdmin } from "infinity-forge";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export function useIsThirdPartyUser() {
  const [isThirdParty, setIsThirdParty] = useState(false);

  const router = useRouter();

  async function verifyThirdPartyUser() {
    const adminUserCookies = await container
      .get<Storage>(InfraTypes.storage)
      .get<"adminUser">("adminUser");

    const JB$SCookies = await container
      .get<Storage>(InfraTypes.storage)
      .get<"JB$S">("JB$S");

    setIsThirdParty(
      !!(JB$SCookies?.isThirdParty || adminUserCookies?.value?.isThirdParty)
    );

    return !!(JB$SCookies?.isThirdParty || adminUserCookies?.value?.isThirdParty);
  }

  useEffect(() => {
    verifyThirdPartyUser();
  }, [router.asPath]);

  return { isThirdParty };
}
