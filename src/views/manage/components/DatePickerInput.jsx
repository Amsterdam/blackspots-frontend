import React, { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import styled from '@datapunt/asc-core';
import 'react-datepicker/dist/react-datepicker.css';

const DatePickerInput = ({ name, onChange, label, defaultValue }) => {
  const [value, setValue] = useState(null);

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
    <DatePicker
      id={name}
      name={name}
      dateFormat="dd-MM-yyyy"
      isClearable
      selected={(value && new Date(value)) || null}
      value={value}
      ref={datePickerRef}
      onChange={val => {
        setValue(val);
        const e = {
          target: {
            name,
            type: 'datepicker',
            value: val && val.toISOString(),
          },
        };
        onChange(e);
      }}
    />
  );
};

export default DatePickerInput;
