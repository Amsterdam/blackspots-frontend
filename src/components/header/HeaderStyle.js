import { themeSpacing, Button, Link } from '@amsterdam/asc-ui';
import styled from 'styled-components';

export const LogoutLink = styled(Button)`
  color: black;
  margin-left: 8px;

  svg path {
    fill: black;
    stroke-width: 0;
  }
  padding: 0;
  margin-right: ${themeSpacing(5)};
`;

export const MenuButton = styled(Link)`
  color: black;
  text-decoration: none;
  font-weight: bold;
  padding: 0 16px 0 8px;

  &:hover {
    color: red;
    text-decoration: underline;
  }
`;
