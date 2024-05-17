import styled from "styled-components";

interface ButtonProps {
  $loading?: boolean;
}

export const Button = styled("div")<ButtonProps>`
  &.active {
    a,
    button {
      background-color: #fff;
      color: ${props => props.theme.primaryColor};

      &:hover {
        background-color: ${props => props.theme.primaryColor};
        color: #fff;
      }
    }
  }

  a {
    display: flex;
    align-items: center;
    justify-items: center;
  }

  a,
  button {
    height: 45px;
    background-color: ${props => props.theme.primaryColor};
    font-weight: 700;
    height: 44px;
    color: #fff;
    width: 100%;
    border-radius: 5px;
    border: 1px solid ${props => props.theme.primaryColor} !important;

    &:hover {
      background-color: #fff;
      color: ${props => props.theme.primaryColor};
    }
  }
`;
