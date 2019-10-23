import styled from '@datapunt/asc-core';
import { themeSpacing, styles } from '@datapunt/asc-ui';

export const HeaderStyle = styled.div`
  display: flex;
  align-items: center;
  margin: ${themeSpacing(4)};

  & > ${styles.HeadingStyle} {
    margin: 0;
    flex-grow: 1;
  }

  & > ${styles.LinkStyle} {
    margin-right: ${themeSpacing(4)};
  }
`;

export const ContentStyle = styled.div`
  display: flex;
  flex-direction: column;
  margin: ${themeSpacing(0, 4, 4, 4)};
  overflow: auto;
  max-height: calc(100% - ${themeSpacing(20)});
  position: relative;
`;
