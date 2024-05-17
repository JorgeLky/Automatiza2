import NextLink from "next/link";
import {
  Button as MuiButton,
  CircularProgress as MuiCircularProgress,
} from "@mui/material";

import { ButtonProps } from "./interfaces";

import * as S from "./styles";

export function Button({
  text,
  href,
  type,
  icon,
  color,
  target,
  variant,
  className,
  loading,
  ...props
}: ButtonProps) {
  return (
    <S.Button className={className ? className : ""}>
      {href && !type ? (
        <NextLink href={href} target={target} passHref {...props}>
          {loading ? (
            <MuiCircularProgress size={12} />
          ) : (
            <a>
              {icon} {text}
            </a>
          )}
        </NextLink>
      ) : (
        <MuiButton
          {...props}
          type={type ? type : "submit"}
          disabled={props.disabled || loading}
          color={color ? color : "primary"}
          variant={variant ? variant : "contained"}
          startIcon={loading ? <MuiCircularProgress size={16} /> : icon}
        >
          {loading ? "" : text}
        </MuiButton>
      )}
    </S.Button>
  );
}
