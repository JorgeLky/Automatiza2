import React from "react";

import { useIsThirdPartyUser } from "../../src/presentation/utils";

export default function Dashboard() {
  const { isThirdParty } = useIsThirdPartyUser();

  return (
    <>
      {isThirdParty ? (
        <button type="button">SOU TERCEIRO</button>
      ) : (
        <button>Não SOU</button>
      )}
    </>
  );
}
