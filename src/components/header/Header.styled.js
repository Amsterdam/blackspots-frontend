import styled from "styled-components";

export const HeaderStyled = styled.div`
  height: 50px;

  display: flex;

  align-items: center;

  background-color: #ffffff;
  box-shadow: 0 2px 0 0 #999999;
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
