import { ITheme } from "./interfaces";

const generalTheme = {
  black: "#000",
  red: "#ef1717",
  green: "#39b15d",
  orange: "#f18805",
  yellow: "#e1b400",
};

const liftone: ITheme = {
  ...generalTheme,
  primaryColor: "#005862",
};

const sancla: ITheme = {
  ...generalTheme,
  primaryColor: "#FA972B",
};

const vetech: ITheme = {
  ...generalTheme,
  primaryColor: "#13C2C2",
};

const themes: { [key in "liftone" | "sancla" | "vetech"]: ITheme } = {
  liftone,
  sancla,
  vetech
};

export { themes };
