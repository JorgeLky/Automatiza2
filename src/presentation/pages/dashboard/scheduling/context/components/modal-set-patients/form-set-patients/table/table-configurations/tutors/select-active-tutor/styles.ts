import styled from "styled-components";

export const SelectActiveTutor = styled.button`
  background-color: transparent;
  border: 1px solid ${props => props.theme.primaryColor};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  padding: 2px;
  border-radius: 3px;

  svg {
    width: 100%;
    fill: ${props => props.theme.primaryColor};
  }
`;

export const ModalContent = styled.div`
  button {
    border: 0;
    background: none;
    padding: 0;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
