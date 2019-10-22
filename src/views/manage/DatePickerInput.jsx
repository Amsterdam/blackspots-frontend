import React, { useReducer } from 'react';
import { DateSingleInput } from '@datepicker-react/styled';
import { ThemeProvider } from '@datapunt/asc-core';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const initialState = {
  date: null,
  showDatepicker: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'focusChange':
      return { ...state, showDatepicker: action.payload };
    case 'dateChange':
      return { ...action.payload, showDatepicker: false };
    default:
      throw new Error('unknown action type');
  }
};

const theme = {
  breakpoints: ['768px', '1024px', '1200px'],
  reactDatepicker: {
    daySize: [36, 40],
    colors: {
      accessibility: '#D80249',
      selectedDay: '#f7518b',
      selectedDayHover: '#F75D95',
      primaryColor: '#d8366f',
    },
  },
};

const StyledDatePicker = ({ name, onChange, ...otherProps }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ThemeProvider theme={theme}>
      <DateSingleInput
        onDateChange={data => {
          dispatch({ type: 'dateChange', payload: data });
          onChange(name, data ? data.date.toISOString() : null);
        }}
        onFocusChange={focusedInput => {
          dispatch({ type: 'focusChange', payload: focusedInput });
        }}
        date={state.date} // Date or null
        showDatepicker={state.showDatepicker} // Boolean
        displayFormat="dd-MM-yyyy"
        {...otherProps}
      />
    </ThemeProvider>
  );
};

const DatePickerField = ({ name, value, onChange }) => {
  return (
    <DatePicker
      dateFormat="dd-MM-yyyy"
      isClearable
      selected={(value && new Date(value)) || null}
      onChange={val => {
        onChange(name, val && val.toISOString());
      }}
    />
  );
};

export default DatePickerField;
