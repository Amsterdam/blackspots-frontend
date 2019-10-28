import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Label } from '@datapunt/asc-ui';

const DatePickerField = ({ name, onChange, label, defaultValue }) => {
  const [value, setValue] = useState(null);
  return (
    <Label htmlFor={name} label={label} position="top">
      <DatePicker
        id={name}
        name={name}
        dateFormat="dd-MM-yyyy"
        isClearable
        selected={(value && new Date(value)) || null}
        value={value}
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

export default DatePickerField;
