import DatePickerInput from '../components/DatePickerInput';
import RadioGroupInput from '../components/RadioGroupInput';
import {
  SpotTypeDisplayNames,
  StatusDisplayNames,
  SpotStatusTypes,
  SpotTypes,
  Stadsdeel,
  GeometryTypes,
} from '../../../config';
import TextInput from '../components/TextInput';
import TextAreaInput from '../components/TextAreaInput';
import FileInput from '../components/FileInput';

const REQUIRED_MESSAGE = 'Er is geen waarde ingevuld';

export const coordinatesField = {
  column: 1,
  name: 'coordinaten',
  label: 'Coördinaten',
  Component: TextInput,
  width: '80%',
  validation: {
    required: REQUIRED_MESSAGE,
    pattern: {
      value: /^\d{1,2}\.\d{2,7}, \d{1,2}\.\d{2,7}$/,
      message:
        'De coördinaten zijn niet in het correcte format `xx.xxxxxxx, xx.xxxxxxx`',
    },
  },
  visible: false,
};

export const polygonField = {
  column: 1,
  name: 'polygoon',
  label: 'Polygoon',
  Component: TextAreaInput,
  width: '80%',
  height: '125px',
  validation: {
    required: REQUIRED_MESSAGE,
    pattern: {
      value: /^(((\((\d+\.?)+,\s?\d+\.?\d+\))+),?\s?)+$/,
      message:
        'De polygoon is niet in het correcte format `(xx,xxxx, xx,xxxxx), (xx,xxxx), xxx.xxxx`',
    },
  },
  visible: false,
};

const FormFields = [
  {
    column: 1,
    name: 'naam',
    label: 'Naam',
    Component: TextInput,
    width: '80%',
    validation: {
      required: REQUIRED_MESSAGE,
    },
  },
  {
    column: 1,
    name: 'locatie_id',
    label: 'Nummer',
    Component: TextInput,
    width: '50%',
    validation: {
      required: REQUIRED_MESSAGE,
    },
  },
  {
    column: 1,
    name: 'spot_type',
    label: 'Type',
    initialValue: SpotTypes.BLACKSPOT,
    Component: RadioGroupInput,
    options: [
      ...Object.keys(SpotTypeDisplayNames).map((name) => ({
        label: SpotTypeDisplayNames[name],
        value: name,
      })),
    ],
    validation: {
      required: REQUIRED_MESSAGE,
    },
  },
  {
    column: 1,
    name: 'coord_or_poly',
    label: 'Coördinaten of Polygoon',
    initialValue: GeometryTypes.POINT,
    Component: RadioGroupInput,
    options: [
      {
        label: 'Coördinaten',
        value: GeometryTypes.POINT,
      },
      {
        label: 'Polygoon',
        value: GeometryTypes.POLYGON,
      },
    ],
    validation: {
      required: REQUIRED_MESSAGE,
    },
    visible: false,
  },
  coordinatesField,
  polygonField,
  {
    column: 1,
    name: 'stadsdeel',
    label: 'Stadsdeel',
    Component: RadioGroupInput,
    options: [
      ...Object.values(Stadsdeel).map((stadsdeel) => ({
        label: stadsdeel.name,
        value: stadsdeel.value,
      })),
    ],
    visible: false,
  },
  {
    column: 1,
    name: 'jaar_blackspotlijst',
    label: 'Jaar opgenomen in blackspotlijst',
    initialValue: String(new Date().getFullYear()),
    visible: true,
    Component: TextInput,
    width: '30%',
    validation: {
      pattern: {
        value: /^(\d{4})?$/,
        message: 'Het jaar is niet in het correcte format `jjjj`',
      },
    },
  },
  {
    column: 1,
    name: 'jaar_ongeval_quickscan',
    label: 'Jaar opgenomen in de protocol',
    initialValue: String(new Date().getFullYear()),
    visible: false,
    Component: TextInput,
    width: '30%',
    validation: {
      pattern: {
        value: /^(\d{4})?$/,
        message: 'Het jaar is niet in het correcte format `jjjj`',
      },
    },
  },
  {
    column: 1,
    name: 'jaar_opgenomen_in_ivm_lijst',
    label: 'Jaar opgenomen in IVM lijst',
    initialValue: String(new Date().getFullYear()),
    visible: false,
    Component: TextInput,
    width: '30%',
    validation: {
      pattern: {
        value: /^(\d{4})?$/,
        message: 'Het jaar is niet in het correcte format `jjjj`',
      },
    },
  },
  {
    column: 1,
    name: 'status',
    label: 'Status',
    initialValue: SpotStatusTypes.ONDERZOEK,
    Component: RadioGroupInput,
    options: [
      ...Object.keys(StatusDisplayNames).map((name) => ({
        label: StatusDisplayNames[name],
        value: name,
      })),
    ],
    validation: {
      required: REQUIRED_MESSAGE,
    },
  },
  {
    column: 2,
    name: 'actiehouder',
    label: 'Actiehouder',
    Component: TextInput,
    width: '80%',
    validation: {
      required: REQUIRED_MESSAGE,
    },
  },
  {
    column: 2,
    name: 'taken',
    label: 'Taken',
    Component: TextAreaInput,
    width: '80%',
    height: '125px',
  },
  {
    column: 2,
    name: 'start_uitvoering',
    label: 'Start uitvoering',
    Component: DatePickerInput,
  },
  {
    column: 2,
    name: 'eind_uitvoering',
    label: 'Eind uitvoering',
    Component: DatePickerInput,
  },
  {
    column: 2,
    name: 'jaar_oplevering',
    label: 'Jaar oplevering',
    Component: TextInput,
    width: '30%',
  },
  {
    column: 2,
    name: 'opmerking',
    label: 'Opmerking',
    Component: TextAreaInput,
    width: '80%',
    height: '125px',
  },
  {
    column: 3,
    name: 'rapport_document',
    label: 'Rapportage',
    initialValue: {},
    Component: FileInput,
  },
  {
    column: 3,
    name: 'design_document',
    label: 'Ontwerp',
    initialValue: {},
    Component: FileInput,
  },
].map((item, id) => ({ ...item, id }));

export const initalValues = FormFields.filter((f) => f.visible).reduce(
  (acc, item) => ({
    ...acc,
    [item.name]: item.initialValue || '',
  }),
  {}
);

export const formValidation = FormFields.filter(
  (f) => f.visible ?? true
).reduce(
  (acc, item) => ({
    ...acc,
    [item.name]: item.validation || {},
  }),
  {}
);

export const formVisibility = FormFields.reduce(
  (acc, item) => ({
    ...acc,
    [item.name]: item.visible ?? true,
  }),
  {}
);

export default FormFields;
