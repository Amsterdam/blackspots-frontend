import styled from '@datapunt/asc-core';
import { Column, themeSpacing, styles } from '@datapunt/asc-ui';

export const ManageFormStyle = styled.form`
  width: 100%;
`;

export const ControlsColumn = styled(Column)`
  flex-direction: column;
  align-items: flex-start;

  & > ${styles.HeadingStyle} {
    margin-bottom: ${themeSpacing(5)};
  }
`;

export const ButtonsColumn = styled(Column)``;

export default ManageFormStyle;
