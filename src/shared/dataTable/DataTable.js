import PropTypes from 'prop-types';
import styled from 'styled-components';
import { themeColor, themeSpacing } from '@amsterdam/asc-ui';

const DataTableStyle = styled.table`
  margin-bottom: ${({ bottom }) => themeSpacing(bottom || 5)};

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
      color: ${themeColor('tint', 'level5')};
      width: 176px; /* fixed column width from design */
      font-size: 16px;
    }
    & > tr > td:nth-child(2) {
    }
  }
`;

const DataTable = ({ children, bottom, ...otherProps }) => {
  return (
    <DataTableStyle bottom={bottom} {...otherProps}>
      {children}
    </DataTableStyle>
  );
};

DataTable.propTypes = {
  bottom: PropTypes.string,
  children: PropTypes.element,
};

export default DataTable;
