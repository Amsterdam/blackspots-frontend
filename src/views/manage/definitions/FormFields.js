import DatePickerInput from '../components/DatePickerInput';
import RadioGroupInput from '../components/RadioGroupInput';
import { SpotTypeDisplayNames, StatusDisplayNames } from '../../../constants';
import TextInput from '../components/TextInput';
import TextAreaInput from '../components/TextAreaInput';

const FormFields = [
  {
    id: 1,
    column: 1,
    name: 'naam',
    label: 'Naam',
    Component: TextInput,
  },
  {
    id: 2,
    column: 1,
    name: 'nummer',
    label: 'Nummer',
    Component: TextInput,
  },
  {
    id: 3,
    column: 1,
    name: 'coordinaten',
    label: 'Coördinaten',
    Component: TextInput,
  },
  {
    id: 4,
    column: 1,
    name: 'spot_type',
    label: 'Type',
    Component: RadioGroupInput,
    options: [
      ...Object.keys(SpotTypeDisplayNames).map(name => ({
        label: SpotTypeDisplayNames[name],
        value: name,
      })),
    ],
  },
  {
    id: 5,
    column: 1,
    name: 'jaar_blackspotlijst',
    label: 'Jaar opgenomen in blackspotlijst',
    Component: TextInput,
  },
  {
    id: 6,
    column: 1,
    name: 'status',
    label: 'Status',
    Component: RadioGroupInput,
    options: [
      ...Object.keys(StatusDisplayNames).map(name => ({
        label: StatusDisplayNames[name],
        value: name,
      })),
    ],
  },
  {
    id: 7,
    column: 2,
    name: 'actiehouder',
    label: 'Actiehouder',
    Component: TextInput,
  },
  {
    id: 8,
    column: 2,
    name: 'taken',
    label: 'Taken',
    Component: TextAreaInput,
  },
  {
    id: 9,
    column: 2,
    name: 'start_uitvoering',
    label: 'Start uitvoering',
    Component: DatePickerInput,
    // extra props
  },
  {
    id: 10,
    column: 2,
    name: 'eind_uitvoering',
    label: 'Eind uitvoering',
    Component: DatePickerInput,
    // extra props
  },
  {
    id: 11,
    column: 2,
    name: 'opmerking',
    label: 'Opmerking',
    Component: TextAreaInput,
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

export default FormFields;
