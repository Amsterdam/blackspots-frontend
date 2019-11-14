import styled from '@datapunt/asc-core';
import {
  Column,
  themeSpacing,
  styles,
  Row,
  themeColor,
} from '@datapunt/asc-ui';

export const ControlsColumn = styled(Column)`
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  & > ${styles.HeadingStyle} {
    margin-bottom: ${themeSpacing(5)};
  }
`;

export const BottomRow = styled(Row)`
  width: 100%;
  position: sticky;
  bottom: 0;
  border-top: 4px solid ${themeColor('tint', 'level3')};
`;

export const ButtonsColumn = styled(Column)`
  background-color: ${themeColor('tint', 'level1')};
  padding: 8px 0 12px;
  align-items: flex-start;
  justify-content: flex-start;

  & > :first-child {
    margin-right: ${themeSpacing(2)};
  }
`;