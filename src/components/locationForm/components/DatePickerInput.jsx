import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Calendar } from '@amsterdam/asc-assets';
import { Icon } from '@amsterdam/asc-ui';
import { dateToString, stringToDate } from '../services/dateUtil';
import DatePickerInputStyle from './DatePickerInputStyle';

const DatePickerInput = ({
  name,
  onChange,
  value: selectedValue,
  ...otherProps
}) => {
  const [value, setValue] = useState(null);

  const onValueChange = (val) => {
    setValue(val);
    const e = {
      target: {
        name,
        type: 'datepicker',
        value: val && dateToString(val),
      },
    };
    onChange(e);
  };

  useEffect(() => {
    setValue(selectedValue ? stringToDate(selectedValue) : null);
  }, [selectedValue]);

  const datePickerRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      if (datePickerRef.current) {
        datePickerRef.current.cancelFocusInput();
        datePickerRef.current.setOpen(false);
      }
    }, 0);
  }, [value]);

  return (
    <DatePickerInputStyle {...otherProps}>
      <DatePicker
        id={name}
        autoComplete="off"
        name={name}
        dateFormat="dd-MM-yyyy"
        selected={(value && new Date(value)) || null}
        value={value}
        ref={datePickerRef}
        onChange={onValueChange}
      />
      <Icon size={20}>
        <Calendar />
      </Icon>
    </DatePickerInputStyle>
  );
};

DatePickerInput.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default DatePickerInput;
