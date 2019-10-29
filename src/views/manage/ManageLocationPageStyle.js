import styled from '@datapunt/asc-core';
import { themeColor, themeSpacing } from '@datapunt/asc-ui';
import { ContentBoxStyle } from '../../styles/SharedStyles';

const FORM_WIDTH = 1280;

export const ManageLocationPageStyle = styled.div`
  width: 100%;
  min-height: 100%;
`;

export const ContentStyle = styled.div`
  width: ${FORM_WIDTH}px;
  padding: ${themeSpacing(7, 0)};
  margin: 0 auto;

  a {
    color: ${themeColor('secondary')};
  }
`;

export default ManageLocationPageStyle;
