import { useContext, createContext } from "react";

import { ThemeProvider as ThemeStyledComponents } from "styled-components";

import { themes } from "./themes";

const themeContext = createContext({});

function ThemeProvider({ children }) {
  return (
    <ThemeStyledComponents theme={themes[process.env.client]}>
      {children}
    </ThemeStyledComponents>
  );
}

function useTheme() {
  const context = useContext(themeContext);

  return context;
}

export { ThemeProvider, useTheme };
