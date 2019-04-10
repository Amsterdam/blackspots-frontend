import styled from 'styled-components';

export const DataTable = styled.table`
  /* Remove borders */
  td {
    border: 0;
  }

  /* Remove hover */
  tr:hover {
    background-color: ${props => props.theme.colors.primaryWhite};

    td {
      box-shadow: none;
    }
  }

  /* Grey text in first column */
  tr td:nth-child(1) {
    font-family: ${props => {
      return props.theme.fontFamily.avenirRoman;
    }};
    color: #787878;
    width: 220px;
    font-size: 16px;
    font-weight: 500;
    line-height: 20px;
  }
`;
