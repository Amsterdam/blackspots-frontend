import { Input } from '@datapunt/asc-ui';
import TextArea from './TextArea';
import DatePickerInput from './DatePickerInput';

const FormFields = [
  {
    column: 1,
    name: 'naam',
    label: 'Naam',
    Component: Input,
  },
  {
    column: 1,
    name: 'nummer',
    label: 'Nummer',
    Component: Input,
  },
  {
    column: 1,
    name: 'coordinaten',
    label: 'Coordinaten',
    Component: Input,
  },
  {
    column: 2,
    name: 'actiehouder',
    label: 'Actiehouder',
    Component: Input,
  },
  {
    column: 2,
    name: 'taken',
    label: 'Taken',
    Component: TextArea,
  },
  {
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

export default FormFields;
