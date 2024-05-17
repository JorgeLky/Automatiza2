interface ITheme {
  black: string;
  red: string;
  green: string;
  orange: string;
  yellow: string;
  primaryColor: string;
}

interface IThemeStyledComponentProps {
  theme?: ITheme;
}

export type { ITheme, IThemeStyledComponentProps };
