import React from 'react';
import { Input, Label } from '@datapunt/asc-ui';
import TextArea from './TextArea';
import DatePickerField from './DatePickerField';
import { RadioGroup } from './RadioInput';

const InputField = ({ name, label, ...otherProps }) => {
  return (
    <Label position="top" htmlFor={name} label={label} align="flex-start">
      <Input name={name} {...otherProps} />
    </Label>
  );
};

const FormFields = [
  {
    id: 1,
    column: 1,
    name: 'naam',
    label: 'Naam',
    Component: InputField,
  },
  {
    id: 2,
    column: 1,
    name: 'nummer',
    label: 'Nummer',
    Component: InputField,
  },
  {
    id: 3,
    column: 1,
    name: 'coordinaten',
    label: 'Coordinaten',
    Component: InputField,
  },
  {
    id: 4,
    column: 1,
    name: 'spot_type',
    label: 'Type',
    Component: InputField,
    // Component: RadioGroup,
    // extra props
  },
  {
    id: 5,
    column: 1,
    name: 'jaar_blackspotlijst',
    label: 'Jaar opgenomen in blackspotlijst',
    Component: InputField,
  },
  {
    id: 6,
    column: 1,
    name: 'status',
    label: 'Status',
    Component: InputField,
    // Component: RadioGroup,
    // extra props
  },
  {
    id: 7,
    column: 2,
    name: 'actiehouder',
    label: 'Actiehouder',
    Component: InputField,
  },
  {
    id: 8,
    column: 2,
    name: 'taken',
    label: 'Taken',
    Component: TextArea,
  },
  {
    id: 9,
    column: 2,
    name: 'start_uitvoering',
    label: 'Start uitvoering',
    Component: DatePickerField,
    // extra props
  },
  {
    id: 10,
    column: 2,
    name: 'eind_uitvoering',
    label: 'Eind uitvoering',
    Component: DatePickerField,
    // extra props
  },
  {
    id: 11,
    column: 2,
    name: 'opmerking',
    label: 'Opmerking',
    Component: TextArea,
  },
];

export const initalValues = {
  ...FormFields.reduce(
    (acc, item) => ({
      ...acc,
      [item.name]: '',
    }),
    {}
  ),
};

export const FormField = ({
  name,
  label,
  Component,
  errors,
  ...otherProps
}) => {
  return (
    // <Label>
    //   {label} {errors && `- ${errors}`}
    <Component name={name} {...otherProps} />
    // </Label>
  );
};

export default FormFields;
