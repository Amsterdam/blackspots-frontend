import styled from '@datapunt/asc-core';
import {
  Column,
  themeSpacing,
  styles,
  Row,
  themeColor,
} from '@datapunt/asc-ui';

export const ManageFormStyle = styled.form`
  width: 100%;
`;

export const ControlsColumn = styled(Column)`
  flex-direction: column;
  justify-content: flex-start;

  & > ${styles.HeadingStyle} {
    margin-bottom: ${themeSpacing(5)};
  }
`;

export const MainRow = styled(Row)`
  margin-bottom: ${themeSpacing(20)};
`;

export const FixedRow = styled(Row)`
  width: 100%;
  position: absolute;
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

export default ManageFormStyle;
