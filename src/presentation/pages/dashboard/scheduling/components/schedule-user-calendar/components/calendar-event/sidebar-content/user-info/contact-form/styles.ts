import styled from "styled-components";

export const ContactForm = styled("div")`
  margin-top: 10px;

  .form-button {
    button {
      background-color: ${(props) => props.theme.green} !important;
      color: #fff;
      border: 0;
    }
  }
`;
