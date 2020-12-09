import styled from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';
import { styles, themeColor } from '@amsterdam/asc-ui';

const DatePickerInputStyle = styled.div`
  position: relative;
  & > .react-datepicker-wrapper > .react-datepicker__input-container > input {
    border: solid 1px ${themeColor('tint', 'level4')};
    border-radius: 0;
    box-sizing: border-box;
    padding: 10px;
    width: 100%;
  }

  & > ${styles.IconStyle} {
    position: absolute;
    top: 10px;
    right: 10px;
  }
`;

export default DatePickerInputStyle;
