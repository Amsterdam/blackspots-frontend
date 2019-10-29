import styled from '@datapunt/asc-core';
import { Column } from '@datapunt/asc-ui';

export const ManageFormStyle = styled.form`
  /* display: block; */
  background-color: #eee;
  width: 100%;
`;

export const StyledColumn = styled(Column)`
  flex-direction: column;
  align-items: flex-start;
`;

export default ManageFormStyle;
