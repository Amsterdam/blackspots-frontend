import React from 'react';
import styled from '@datapunt/asc-core';
import { themeColor } from '@datapunt/asc-ui';

const DataTableStyle = styled.table`
  & > tbody {
    & > tr {
      height: 32px;
    }

    /* Remove borders */
    & > tr > td {
      border: 0;
    }

    /* Remove hover */
    & > tr:hover {
      background-color: ${themeColor('tint', 'level0')};

      td {
        box-shadow: none;
      }
    }

    /* Grey text in first column */
    & > tr > td:nth-child(1) {
      color: ${themeColor('tint', 'level4')};
      /* width: 176px; */
      font-size: 16px;
    }
    & > tr > td:nth-child(2) {
      width: 253px;
    }
  }
`;

const DataTable = ({ children }) => {
  return <DataTableStyle>{children}</DataTableStyle>;
};

export default DataTable;
