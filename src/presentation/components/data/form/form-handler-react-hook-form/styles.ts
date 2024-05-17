import styled from "styled-components";

export const FormHandler = styled("div")`
  width: 100%;

  .errorForm {
    font-size: 12px;
    color: ${props => props.theme.red};
    font-weight: 500;
    display: flex;
    margin-bottom: 10px;
  }

  .form-button {
    margin-top: 15px
  }

  form {
    display: block !important;
  }

`;
