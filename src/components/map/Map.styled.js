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
