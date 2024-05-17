import styled from "styled-components";

export const FormCreateClient = styled("div")`
  button {
    width: 100%;
  }

  .form-content {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;

    label {
      font-weight: 400;
    }

    > div {
      width: 100%;
    }

    h5 {
      margin-bottom: 15px;
    }
  }

  .form-button {
    max-width: 90px !important;
    margin: 15px 0 0 auto;

    button {
      width: 100%;
      height: 30px;
      border-radius: 4px;
      border: 0;
      color: #fff;
      text-transform: uppercase;
      font-weight: 500;
      background-color: ${(props) => props.theme.primaryColor};
    }
  }
`;
