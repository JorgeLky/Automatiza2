import { AdminUser } from "@/domain";

export type CacheKeys = "guid" | "token" | "adminUser" | "JB$S";

export type CacheValues = {
  guid: {
    value: string | null;
  };
  token: {
    value: string | null;
  };
  adminUser: {
    value: AdminUser | null;
  };
  JB$S: {
    token: string;
    logged: boolean;
    isThirdParty?: boolean,
    systemConfig: {
      id: number;
      url: string;
      active: boolean;
      system: {
        id: number;
        name: string;
      };
    };
  } | null | undefined;
};
