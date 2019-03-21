import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const HeaderStyled = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  width: 100%;
  border-bottom: 2px solid ${props => props.theme.colors.neutralGrey4};
`;

export const Logo = styled.img`
  height: 40px;
  width: 70px;
  margin: 0 20px 0 10px;
`;

export const Title = styled.span`
  height: 25px;
  font-family: ${props => {
    return props.theme.fontFamily.avenirHeavy;
  }};
  font-size: 20px;
  font-weight: 900;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.25;
  letter-spacing: normal;
  color: ${props => props.theme.colors.black};
`;

export const ButtonBar = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;

  a {
    margin-right: 10px;
  }
`;

export const NavLinkStyled = styled(NavLink)`
  &.active {
    text-decoration-line: underline;
    text-decoration-color: red;
  }
`;
