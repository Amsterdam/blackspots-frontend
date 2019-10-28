import styled from '@datapunt/asc-core';
import { Column } from '@datapunt/asc-ui';

export const ManageFormStyle = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-grow: 1;
  background-color: lightgrey;
  width: 100%;
`;

export const StyledColumn = styled(Column)`
  display: flex;
  flex-direction: column;
`;

export default ManageFormStyle;
