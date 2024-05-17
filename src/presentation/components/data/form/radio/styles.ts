import styled from "styled-components";

export const InputRadio = styled("div")`
  margin-bottom: 10px;

  .MuiFormControlLabel-label {
    width: calc(100% - 25px);
    font-size: 13px;
  }

  label {
    margin: 0;
    gap: 3px;
    display: inline-block !important;
    align-items: center;
    margin-bottom: 5px;

    span {
      margin-right: 2px;
      padding: 0;
      font-family: unset;
      font-size: 15px;
    }
  }
`;
