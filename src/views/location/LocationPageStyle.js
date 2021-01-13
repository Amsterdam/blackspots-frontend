import styled from '@datapunt/asc-core';
import { themeColor, themeSpacing } from '@datapunt/asc-ui';

const FORM_WIDTH = 1280;

export const LocationPageStyle = styled.div`
  background-color: ${themeColor('tint', 'level2')};
  width: 100%;
  min-height: 100%;
`;

export const ContentStyle = styled.div`
  max-width: ${FORM_WIDTH}px;
  padding: ${themeSpacing(7, 0, 0)};
  margin: 0 auto;
  background-color: ${themeColor('tint', 'level1')};
  min-height: calc(100vh - 52px);

  a {
    color: ${themeColor('secondary')};
  }
`;

export default LocationPageStyle;
