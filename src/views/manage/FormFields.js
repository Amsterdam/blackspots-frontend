import React from 'react';
import { Input } from '@datapunt/asc-ui';
import TextArea from './TextArea';
import DatePickerInput from './DatePickerInput';
import { Label } from './ManageFormStyle';

const FormFields = [
  {
    id: 1,
    column: 1,
    name: 'naam',
    label: 'Naam',
    Component: Input,
  },
  {
    id: 2,
    column: 1,
    name: 'nummer',
    label: 'Nummer',
    Component: Input,
  },
  {
    id: 3,
    column: 1,
    name: 'coordinaten',
    label: 'Coordinaten',
    Component: Input,
  },
  {
    id: 4,
    column: 2,
    name: 'actiehouder',
    label: 'Actiehouder',
    Component: Input,
  },
  {
    id: 5,
    column: 2,
    name: 'taken',
    label: 'Taken',
    Component: TextArea,
  },
  {
    id: 6,
    column: 2,
    name: 'startDate',
    label: 'Start uitvoering',
    Component: DatePickerInput,
    customOnChange: true,
  },
];

export const initalValues = {
  ...FormFields.reduce(
    (acc, item) => ({
      ...acc,
      [item.naam]: '',
    }),
    {}
  ),
};

export const FormField = ({
  // key,
  name,
  label,
  Component,
  errors,
  ...otherProps
}) => {
  return (
    <Label>
      {label} {errors && `- ${errors}`}
      <Component name={name} {...otherProps} />
    </Label>
  );
};

export default FormFields;
