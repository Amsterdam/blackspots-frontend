import React, { useEffect } from 'react';
import { Heading, Label, Input, Button } from '@datapunt/asc-ui';
import useForm from 'react-hook-form';
import useAppReducer from 'shared/hooks/useAppReducer';
import { REDUCER_KEY as LOCATION } from 'shared/reducers/location';
import { initalValues } from './FormFields';
import ManageFormStyle from './ManageFormStyle';
import RadioInput, { RadioGroup } from './RadioInput';
import { spotTypeDisplayNames, StatusDisplayNames } from '../../constants';
import DatePickerField from './DatePickerField';
import ManageFormComponent from './ManageFormComponent';

const normalize = item => {
  if (!item) return initalValues;

  const {
    geometry: { coordinates },
    properties,
  } = item;
  return {
    ...initalValues,
    naam: properties.description,
    nummer: properties.locatie_id,
    coordinaten: `${coordinates[1]}, ${coordinates[0]}`,
    spot_type: properties.spot_type,
    jaar_blackspotlijst: properties.jaar_blackspotlijst,
    status: properties.status,
    actiehouder: properties.actiehouders,
    taken: properties.tasks,
    start_uitvoering: properties.start_uitvoering,
    eind_uitvoering: properties.eind_uitvoering,
    jaar_oplevering: properties.jaar_oplevering,
    opmerking: properties.notes,
  };
};

const ManageForm = ({ id }) => {
  const [{ selectedLocation }] = useAppReducer(LOCATION);

  const location = normalize(selectedLocation);

  const defaultValues = {
    naam: location.naam,
    nummer: location.nummer,
    approved: true,
    spot_type: 'blackspot',
    status: 'onderzoek ontwerp',
    start_uitvoering: '',
  };
  const { register, handleSubmit, watch, setValue, errors } = useForm({
    defaultValues,
  });
  const onSubmit = data => console.log(data);
  const handleChange = e => {
    console.log('handleChange', e.target);
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    console.log(value);
    setValue(e.target.name, value);
  };
  console.log(watch('name'), watch('start_uitvoering'));

  useEffect(() => {
    Object.keys(initalValues).map(name => {
      console.log('register', name);
      register({ name: name });
    });
  }, [register]);

  return (
    <>
      <Heading>Toevoegen/Wijzigen</Heading>
      <ManageFormComponent
        onSubmit={handleSubmit(onSubmit)}
        handleChange={handleChange}
      />

      {/* <ManageFormStyle onSubmit={handleSubmit(onSubmit)}>
        <Label position="top" htmlFor="naam" label="Naam" align="flex-start">
          <Input
            name="naam"
            defaultValue={defaultValues.naam}
            onChange={handleChange}
          />
        </Label>
        <Label
          position="top"
          htmlFor="nummer"
          label="Nummer"
          align="flex-start"
        >
          <Input
            name="nummer"
            defaultValue={defaultValues.nummer}
            onChange={handleChange}
          />
        </Label>
        {errors.nummer && <span>Required field</span>}

        <RadioGroup label="Type">
          {Object.keys(spotTypeDisplayNames).map(name => {
            return (
              <RadioInput
                key={name}
                name="spot_type"
                label={spotTypeDisplayNames[name]}
                value={name}
                onChange={handleChange}
              />
            );
          })}
        </RadioGroup>

        <RadioGroup label="Status">
          {Object.keys(StatusDisplayNames).map(name => {
            return (
              <RadioInput
                key={name}
                name="status"
                label={StatusDisplayNames[name]}
                value={name}
                onChange={handleChange}
              />
            );
          })}
        </RadioGroup>

        <DatePickerField
          name="start_uitvoering"
          label="Start uitvoering"
          onChange={handleChange}
        ></DatePickerField>

        <Button type="submit" variant="primary">
          Opslaan
        </Button>
        <Button type="reset" variant="tertiary">
          Annuleren
        </Button>
      </ManageFormStyle> */}
    </>
  );
};

export default ManageForm;
