import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    
    -webkit-font-smoothing: antialiased;

  }

  body {
    background-color: ${(props) => props.theme['gray-800']};
    color: ${(props) => props.theme['gray-100']};

    -webkit-font-smoothing: antialiased;
  }

  body, input, textarea, button{
    font-family: 400 1rem Roboto, sans-serif;
  }

  button {
    cursor: pointer;
    transition: .3s;

    &:disabled {
      cursor: not-allowed;
    }
  }
/*   
  h1, h2, h3, h4, h5, h6 p, span {
    line-height: 130%;
  } */

  :focus {
    outline: 0;
    box-shadow: 0 0 0 2px ${(props) => props.theme['gray-500']};
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  ::-webkit-scrollbar {
    width: 0.4rem;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme['gray-700']}
  }
  
  ::-webkit-scrollbar-thumb {
    border-radius: 2rem;
    background: ${({ theme }) => theme['green-700']}
  }


`;
