import styled from '@datapunt/asc-core';

const HEADER_HEIGHT = 52;

const AppStyle = styled.div`
  height: 100%;
`;

export const ContentStyle = styled.div`
  height: calc(100% - ${HEADER_HEIGHT}px);
  overflow: auto;
`;

export default AppStyle;
