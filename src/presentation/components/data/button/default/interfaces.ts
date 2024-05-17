export interface ButtonProps extends React.ButtonHTMLAttributes<any> {
  text: string;
  href?: string;
  type?: "submit" | "button";
  loading?: boolean;
  target?: string;
  icon?: JSX.Element;
  variant?: "text" | "contained" | "outlined";
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
}
