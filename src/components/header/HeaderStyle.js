import { Link, themeSpacing, Button, themeColor } from '@datapunt/asc-ui';
import styled from '@datapunt/asc-core';

export const HeaderLink = styled(Link)`
  margin-right: ${themeSpacing(6)};

  &:focus {
    background-color: ${themeColor('tint', 'level1')};
  }
`;

export const LogoutLink = styled(Button)`
  color: black;
  padding: 0;
  margin-right: ${themeSpacing(5)};

  &:hover {
    text-decoration: none;
  }
`;
