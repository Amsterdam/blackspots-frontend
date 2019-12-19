import styled from '@datapunt/asc-core';
import { themeSpacing } from '@datapunt/asc-ui';

const CONTENT_WIDTH = 1280;

export const ContentBoxStyle = styled.div`
  width: ${CONTENT_WIDTH}px;
  padding: ${themeSpacing(5, 25)};
`;

export const IntroTextStyle = styled.p`
  font-size: 19px;
  line-height: 26px;
`;
