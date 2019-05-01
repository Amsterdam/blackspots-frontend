import styled, { keyframes } from 'styled-components';

export const MapContainer = styled.div`
  height: 100%;
  width: 100%;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const LoadingDiv = styled.div`
  position: absolute;
  left: calc(50% - 32px);
  bottom: 50%;
  z-index: 1011;
  background-color: white;
  padding: 5px;
  border-radius: 5px;
`;

export const Spinner = styled.div`
  height: 64px;
  width: 64px;

  border-radius: 50%;
  border: 5px solid #fff;
  border-color: #ec0000 transparent #ec0000 transparent;
  animation: ${rotate} 2s linear infinite;
`;
