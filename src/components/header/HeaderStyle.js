import { Header, themeSpacing, Button, themeColor } from '@amsterdam/asc-ui';
import styled from 'styled-components';

export const StyledHeader = styled(Header)`
  li {
    a {
      padding: 14px ${themeSpacing(4)};
      color: black;
      font-weight: 700;
      text-decoration: none;

      &:hover {
        color: ${themeColor('secondary')};
      }
    }
  }
`;

export const LogoutLink = styled(Button)`
  color: ${themeColor('tint', 'level7')};
  padding: 0;
  margin-right: ${themeSpacing(5)};
  margin-left: ${themeSpacing(4)};

  &:hover {
    text-decoration: none;
  }
`;
