import styled from "styled-components";

export const FormContainer = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;

  color: ${(props) => props.theme["gray-100"]};

  font-size: 1.125rem;
  font-weight: bold;
`;

const BaseInput = styled.input`
  background-color: transparent;
  height: 2.5rem;
  border: 0;
  border-bottom: 2px solid ${(props) => props.theme["gray-500"]};
  font-weight: bold;
  font-size: 1.125rem;
  padding: 0 0.5rem;
  color: ${(props) => props.theme["gray-100"]};

  &:focus {
    box-shadow: none;
    border-color: ${(props) => props.theme["green-500"]};
  }

  &::placeholder {
    color: ${(props) => props.theme["gray-500"]};
  }

  &:disabled {
    cursor: not-allowed;
  }
`;
//Usando um componente estilizado de base para criar outros componentes ao colocar dentro de "()"
export const TaskInput = styled(BaseInput)`
  flex: 1;
  //&: refrencia o input
  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }
`;
export const MinutsAmout = styled(BaseInput)`
  width: 4rem;
`;
