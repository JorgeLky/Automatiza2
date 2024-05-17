import styled from "styled-components";

export const FormUserController = styled("div")`

  .row {
    display: flex;
    gap: 15px;
  }

  .form-button {
    width: 100%;

    button {
      background-color: ${(props) => props.theme.primaryColor} !important;
      border: 0;
      align-items: center;
      justify-content: center;
      margin-left: auto;
      display: flex;
      font-weight: bold;
      text-transform: uppercase;

      svg {
        color: #fff;
      }
    }
  }
`;
