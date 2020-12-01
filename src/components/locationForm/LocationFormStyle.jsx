import styled from 'styled-components';
import {
  Column,
  themeSpacing,
  styles,
  Row,
  themeColor,
} from '@amsterdam/asc-ui';

export const ControlsColumn = styled(Column)`
  flex-direction: column;
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
  padding: ${themeSpacing(2, 0, 3)};
  justify-content: flex-start;

  & > :first-child {
    margin-right: ${themeSpacing(2)};
  }
`;
