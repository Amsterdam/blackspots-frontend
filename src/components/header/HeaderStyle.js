import { themeSpacing, Button } from '@amsterdam/asc-ui';
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
