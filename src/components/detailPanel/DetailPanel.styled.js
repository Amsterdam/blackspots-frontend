import styled from 'styled-components';

export const DetailPanelStyled = styled.div`
  width: ${props => (props.open ? '480px' : '0')};
  transition: width 300ms ease-in-out;
  height: 100%;
  position: absolute;
  right: 0;
  overflow: hidden;
  background-color: ${props => props.theme.colors.primaryWhite};
  z-index: 1010;
`;
