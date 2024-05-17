import styled from "styled-components";

interface IInputStyleProps {
  $loading?: boolean;
}

export const InputControl = styled("div")<IInputStyleProps>`
  width: 100%;
  margin-bottom: 10px;

  .input-content {
    position: relative;
    min-height: 40px;
    width: 100%;
    border: 1px solid #e5e5e5;

    * {
      min-height: inherit;
    }
  }

  input,
  select,
  textarea,
  .fakeInput {
    min-height: inherit;
    width: 100%;
    padding: 0 10px;
    background: #fff;
    color: #666;
    border: 0;
    transition: 0.2s ease-in-out;
    vertical-align: middle;
    display: inline-block;
    transition-property: color, background-color, border;
    font-size: 14px;

    &:focus {
      outline: none;
    background-color: #fff;
    color: #666;
    border-color: #1e87f0;
    }
  }

  textarea {
    height: 80px;
    padding-top: 10px;
  }

  ${(props) =>
    props.$loading &&
    `
    select {
      -webkit-appearance:none; /* Para navegadores baseados no WebKit (Chrome, Safari, etc.) */
    -moz-appearance: none; /* Para navegadores baseados no Gecko (Firefox) */
    appearance: none; /* Para navegadores que suportam a propriedade appearance */
    }
  `}

  label + input, label + textarea {
    margin-top: 4px;
  }
`;
