import styled from '@datapunt/asc-core';
import { themeColor } from '@datapunt/asc-ui';
import { ContentBoxStyle } from '../../styles/SharedStyles';

export const ManageLocationPageStyle = styled.div`
  width: 100%;
  min-height: 100%;
`;

export const ContentStyle = styled(ContentBoxStyle)`
  a {
    color: ${themeColor('secondary')};
  }
`;

export default ManageLocationPageStyle;
