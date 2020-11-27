import styled from 'styled-components';
import { themeSpacing, styles, themeColor, Link } from '@datapunt/asc-ui';

export const HeaderStyle = styled.div`
  display: flex;
  align-items: center;
  padding: ${themeSpacing(4)};

  & > ${styles.HeadingStyle} {
    margin: 0;
    flex-grow: 1;
  }

  & > ${styles.LinkStyle} {
    margin-right: ${themeSpacing(4)};
  }

  border-bottom: 2px solid ${themeColor('tint', 'level3')};
`;

export const ContentStyle = styled.div`
  display: flex;
  flex-direction: column;
  margin: ${themeSpacing(0, 4, 4, 4)};
  overflow: auto;
  max-height: calc(100% - ${themeSpacing(20)});
  position: relative;
`;

export const TitleStyle = styled.div`
  margin-top: ${themeSpacing(3)};
`;

export const ExternalLinkContainerStyle = styled.div`
  margin-left: ${themeSpacing(1)};
  margin-bottom: ${themeSpacing(6)};
`;

export const ExternalLinkStyle = styled(Link)`
  display: flex;
  font-size: 16px;
  line-height: 16px;

  &:hover {
    & > ${styles.IconStyle} > svg > path {
      fill: ${themeColor('secondary')};
    }
  }

  & > ${styles.IconStyle} {
    margin-top: 1px;
    margin-right: ${themeSpacing(2)};
  }
`;
