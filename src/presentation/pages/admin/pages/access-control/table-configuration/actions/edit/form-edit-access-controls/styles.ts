import styled from "styled-components";

export const EditAccessControls = styled("div")`
  .row {
    display: flex;
    gap: 15px;
  }

  .form {
    position: relative;
  }

  .form-button {
    width: 100%;
    position: sticky;
    bottom: -4px;
    padding-bottom: 4px;
    right: 0;
    background-color: #fff;
    border-top: 1px solid #aaaaaa;
    padding-top: 15px;

    button {
      background-color: ${(props) => props.theme.primaryColor} !important;
      margin-left: auto;
      display: flex;
      align-items: center;
      justify-content: center;
      text-transform: uppercase;
      border: 0;
      font-weight: 700;
      font-size: 18px;

      svg {
        color: #fff;
      }
    }
  }
`;
