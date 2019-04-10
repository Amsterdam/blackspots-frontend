import styled from 'styled-components';
import { SpotStatusColor } from 'constants.js';

export const DetailPanelStyled = styled.div`
  width: ${props => (props.isOpen ? '480px' : '0px')};
  transition: width 300ms ease-in-out;
  height: 100%;
  position: absolute;
  right: 0;
  overflow: hidden;
  background-color: ${props => props.theme.colors.primaryWhite};
  z-index: 1010;

  h3 {
    color: ${props => props.theme.colors.primaryRed};
    font-size: 18px;
    font-weight: 900;
    line-height: 20px;
    margin-bottom: 10px;
  }

  h2 {
    font-size: 20px;
    font-weight: 900;
    line-height: 28px;
    margin-top: 0;
    margin-bottom: 0;
    height: auto;
  }
`;

export const PanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 15px 15px 0 15px;
`;

export const PanelContent = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 15px 15px 15px;
`;

export const CloseBtn = styled.button`
  height: 32px;
  width: 32px;
  background-color: transparent;
  padding: 3px 3px 1px 3px;
  margin: 0;
  border: lightgray solid 2px;
  cursor: pointer;
  float: right;
`;

export const StatusColor = styled.span`
  &:before {
    content: '';
    display: inline-block;
    height: 16px;
    width: 16px;
    background-color: ${props => SpotStatusColor[props.status]};
    margin-right: 10px;
    margin-bottom: -2px;
  }
`;

export const BlackspotIcon = styled.div`
  &:before {
    content: '';
    display: inline-block;
    height: 16px;
    width: 16px;
    background-color: ${props => SpotStatusColor[props.status]};
    margin-right: 10px;
    margin-bottom: -2px;
  }
`;
