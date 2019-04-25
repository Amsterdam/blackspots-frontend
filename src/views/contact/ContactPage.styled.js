import styled from 'styled-components';

export const ContactStyled = styled.div`
  h3 {
    font-size: 20px;
    font-weight: 900;
    line-height: 20px;
    color: ${props => props.theme.colors.primaryRed};
  }

  a {
    color: ${props => props.theme.colors.primaryBlack};
  }
`;
