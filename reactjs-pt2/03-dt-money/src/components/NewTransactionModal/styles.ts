import * as Dialog from "@radix-ui/react-dialog";

import styled from "styled-components";

export const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0; //a mesma coisa que top: 0; bottom: 0; left: 0; right: 0;
  background-color: rgba(0, 0, 0, 0.75);
`;

export const Content = styled(Dialog.Content)`
  position: fixed;

  min-width: 32rem;

  border-radius: 6px;
  padding: 2.5rem 3rem;

  background: ${props => props.theme["gray-800"]};
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  form {
    margin-top: 2rem;

    display: flex;
    flex-direction: column;
    gap: 1rem;
    
    input {
      border-radius: 6px;
      border: 0;
      background-color: ${props => props.theme["gray-900"]};
      color: ${props => props.theme["gray-300"]};
      padding: 1rem;

      &::placeholder {
        color: ${props => props.theme["gray-500"]};
      }
    }
  }

  button[type="submit"] {
    width: 100%;
    height: 58px;
    border: 0;
    background-color: ${props => props.theme["green-500"]};
    color: ${props => props.theme.white};
    font-weight: bold;
    padding: 0 1.25rem;
    border-radius: 6px;

    margin-top: 1.5rem;

    cursor: pointer;

    &:hover {
      background-color: ${props => props.theme["green-700"]};
      /* transition: background-color .2s; //definido no css global */
    }
  }
`;

export const CloseButton = styled(Dialog.Close)`
  position: absolute;
  background: transparent;
  border: 0;

  top: 1.5rem;
  right: 1.5rem;

  cursor: pointer;
  color: ${props => props.theme["gray-500"]}
`;