import styled from 'styled-components';

export const LoaderContainer = styled.div`
  width: 65px;
  margin: 4rem auto 0;

  @keyframes flip {
    0% {
      transform: rotateY(0);
    }
    100% {
      transform: rotateY(-180deg);
    }
  }

  .loader__image {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .loader__coin {
    animation: flip 0.5s ease-in-out infinite alternate-reverse both;
  }
`;
