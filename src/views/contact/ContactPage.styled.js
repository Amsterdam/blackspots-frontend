import styled from 'styled-components';

export const ContactStyled = styled.div`
  table tr td:nth-child(1) {
    font-family: ${props => {
      return props.theme.fontFamily.avenirRoman;
    }};
    color: #787878;
    width: 220px;
    font-size: 16px;
    font-weight: 500;
    line-height: 20px;
  }
`;
