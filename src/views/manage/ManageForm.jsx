import React, { useEffect } from 'react';
import { Heading, Button, Row, Column } from '@datapunt/asc-ui';
import useForm from 'react-hook-form';
import useAppReducer from 'shared/hooks/useAppReducer';
import { REDUCER_KEY as LOCATION } from 'shared/reducers/location';
import { initalValues } from './FormFields';
import ManageFormStyle, { StyledColumn } from './ManageFormStyle';
import FormFields, { FormField } from './FormFields';

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
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues,
  });
  const onSubmit = data => console.log(data);
  const handleChange = e => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setValue(e.target.name, value);
  };
  console.log(watch('naam'), watch('start_uitvoering'));

  useEffect(() => {
    Object.keys(initalValues).map(name => {
      return register({ name: name });
    });
  }, [register]);

  return (
    <>
      <Heading>Toevoegen/Wijzigen</Heading>
      <ManageFormStyle onSubmit={handleSubmit(onSubmit)} action="" novalidate>
        <Row>
          <StyledColumn span={6} direction="vertical">
            <Heading $as="h3" color="secondary">
              Locatie
            </Heading>
            {FormFields.filter(({ column }) => column === 1).map(
              ({ id, name, ...otherProps }) => (
                <FormField
                  key={id}
                  {...otherProps}
                  name={name}
                  onChange={handleChange}
                ></FormField>
              )
            )}
          </StyledColumn>
          <StyledColumn span={6}>
            <Heading $as="h3" color="secondary">
              Maatregelen
            </Heading>
            {FormFields.filter(({ column }) => column === 2).map(
              ({ id, name, ...otherProps }) => (
                <FormField
                  key={id}
                  name={name}
                  onChange={handleChange}
                  {...otherProps}
                ></FormField>
              )
            )}
          </StyledColumn>
        </Row>
        <Row>
          <Column span={12}>
            {/* {errors && (
              <Label>
                De volgende velden zijn niet correct ingevuld:{' '}
                {&& Object.keys(errors).map(key => `${errors[key]},`)}
              </Label>
            )} */}
            <Button variant="primary" type="submit">
              Opslaan
            </Button>
            <Button variant="primaryInverted" type="reset">
              Annuleren
            </Button>
          </Column>
        </Row>
      </ManageFormStyle>
    </>
  );
};

export default ManageForm;
