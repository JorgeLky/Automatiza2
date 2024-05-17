const systemClientsConfiguration = {
  vetech: {
    logo: "/images/logo/vetech.svg",
  },
  sancla: {
    logo: "/images/logo/sancla.png",
  },
  liftone: {
    logo: "/images/logo/liftone.png",
  },
};

export type ClientsName = keyof typeof systemClientsConfiguration;

export const systemConfiguration =
  systemClientsConfiguration[process.env.client as ClientsName];
