import styled from "styled-components";

export const Select = styled("div")`
  width: 100%;
  margin-bottom: 15px;

  * {
    font-size: 14px !important;
  }

  [class*="MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root"] {
    > div {
      display: flex;
      align-items: center;
    }
  }

  .input-content {
    width: 100%;

    > div {
      width: 100%;

      > div {
        width: 100%;

        li {
          display: flex;
        }
      }
    }
  }
`;
