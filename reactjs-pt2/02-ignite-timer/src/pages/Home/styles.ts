import styled from 'styled-components';

export const HomeContainer = styled.main`

  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`;

export const FormContainer = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  color: ${(props) => props.theme['gray-100']};

  font-size: 1.125rem;
  font-weight: bold;
  flex-wrap: wrap;

  label {
    display: flex;
    align-items: center;
  
    gap: 0.5rem;
  }
`;

const BaseInput = styled.input`
  background-color: transparent;
  height: 2.5rem;
  border: 0;
  border-bottom: 2px solid ${(props) => props.theme['gray-500']};
  font-weight: bold;
  font-size: inherit; // herda o font-size do container pois o form container já tem o font-size especificado
  padding: 0 0.5rem;
  color: ${(props) => props.theme['gray-100']};

  &::placeholder {
    color: ${(props) => props.theme['gray-500']};
  }

  &:focus {
    box-shadow: none;
    border-color: ${(props) => props.theme['green-300']};
  }
`;

export const TaskInput = styled(BaseInput)`
  flex: 1;
`;

export const MinutesAmountInput = styled(BaseInput)`
  width: 4rem;
`;

export const CountDownContainer = styled.div`
  font-family: 'Roboto Mono', monospace;
  font-size: 10rem;
  line-height: 8rem;
  color: ${(props) => props.theme['gray-100']};

  display: flex;
  gap: 1rem;

  span {
    background-color: ${(props) => props.theme['gray-700']};
  
    padding: 2rem 1rem;
    border-radius: 8px;
  }
`;

export const Separator = styled.div`
  padding: 2rem 0;
  color: ${(props) => props.theme['green-500']};

  width: 4rem;
  overflow: hidden;

  display: flex;
  justify-content: center;
`;

export const StartCountDownButton = styled.button`
  width: 100%;
  padding: 1.0625rem;
  border: none;
  border-radius: 8px;

  display: flex;
  justify-content: center;
  align-items: center;

  gap: .5rem;
  background-color: ${(props) => props.theme['green-500']};

  cursor: pointer;

  font-weight: bold;
  color: ${(props) => props.theme['gray-100']};
  transition: 0.2s;

  &:not(:disabled):hover {
    background-color: ${(props) => props.theme['green-700']};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }


`;
