import styled from 'styled-components';
import { Heading, themeSpacing, themeColor } from '@amsterdam/asc-ui';

const CONTENT_WIDTH = 1280;

export const ContentBoxStyle = styled.div`
  width: ${CONTENT_WIDTH}px;
  padding: ${themeSpacing(5, 25)};
`;

export const IntroTextStyle = styled.p`
  font-size: 19px;
  line-height: 26px;
`;

export const H1 = styled(Heading)`
  margin: ${themeSpacing(5)} 0;
`;

export const HeaderSecondary = styled(Heading)`
  color: ${themeColor('secondary', 'main')};
`;
