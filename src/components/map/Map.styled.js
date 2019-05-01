import styled, { keyframes } from 'styled-components';

export const MapContainer = styled.div`
  height: 100%;
  width: 100%;
`;

export const ErrorDiv = styled.div`
  width: 300px;
  position: absolute;
  left: calc(50% - 150px);
  bottom: 50%;
  z-index: 1011;
  background-color: white;
  padding: 0 15px 0 15px;
  border-radius: 5px;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
