import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import styled from '@datapunt/asc-core';
import 'react-datepicker/dist/react-datepicker.css';
import { Calendar } from '@datapunt/asc-assets';
import { Icon, styles, themeColor } from '@datapunt/asc-ui';

const DatePickerStyle = styled.div`
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

const DatePickerInput = ({ name, onChange, defaultValue }) => {
  const [value, setValue] = useState(null);

  const onValueChange = val => {
    setValue(val);
    const e = {
      target: {
        name,
        type: 'datepicker',
        value: val && val.toISOString(),
      },
    };
    onChange(e);
  };

  useEffect(() => {
    defaultValue && setValue(new Date(defaultValue));
  }, [defaultValue]);

  const datePickerRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      datePickerRef.current.cancelFocusInput();
      datePickerRef.current.setOpen(false);
    }, 0);
  }, [value]);

  return (
    <DatePickerStyle>
      <DatePicker
        id={name}
        autoComplete="off"
        name={name}
        dateFormat="dd-MM-yyyy"
        selected={(value && new Date(value)) || null}
        value={value}
        ref={datePickerRef}
        onChange={onValueChange}
      ></DatePicker>
      <Icon size={20}>
        <Calendar />
      </Icon>
    </DatePickerStyle>
  );
};

DatePickerInput.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.shape({}).isRequired,
};

export default DatePickerInput;
