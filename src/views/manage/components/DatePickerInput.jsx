import React, { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Label } from '@datapunt/asc-ui';

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
    <Label htmlFor={name} label={label} position="top">
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
    </Label>
  );
};

export default DatePickerInput;
