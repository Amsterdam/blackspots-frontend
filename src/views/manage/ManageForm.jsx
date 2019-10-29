import React, { useEffect } from 'react';
import { Heading, Button, Row, Column } from '@datapunt/asc-ui';
import useForm from 'react-hook-form';
import useAppReducer from 'shared/hooks/useAppReducer';
import { REDUCER_KEY as LOCATION } from 'shared/reducers/location';
import { initalValues } from './definitions/FormFields';
import ManageFormStyle, { StyledColumn } from './ManageFormStyle';
import FormFields from './definitions/FormFields';
import FormInput from './components/FormInput';

/**
 *
 * @param {string} date in dd/MM/yy format
 *
 * Temporary function to handle the date that comes from the server.
 * It will be replaced when the retrieved date will be in ISO format
 *
 */
const getDate = date => {
  const regExp = /\d{2}\/\d{2}\/\d{2}/;

  return date && date.match(regExp)
    ? new Date(
        `20${date
          .split('/')
          .reverse()
          .join('-')}`
      ).toISOString()
    : null;
};

/**
 *
 * @param {object} item
 *
 * Converts the server feature to a client location object
 *
 */
const normalize = item => {
  if (!item) return initalValues;

  const {
    geometry: { coordinates },
    properties: {
      description,
      locatie_id,
      spot_type,
      jaar_blackspotlijst,
      status,
      actiehouders,
      tasks,
      start_uitvoering,
      eind_uitvoering,
      jaar_oplevering,
      notes,
    },
  } = item;
  return {
    ...initalValues,
    naam: description,
    nummer: locatie_id,
    coordinaten: `${coordinates[1]}, ${coordinates[0]}`,
    spot_type: spot_type,
    jaar_blackspotlijst: jaar_blackspotlijst,
    status: status,
    actiehouder: actiehouders,
    taken: tasks,
    start_uitvoering: getDate(start_uitvoering),
    eind_uitvoering: getDate(eind_uitvoering),
    jaar_oplevering: jaar_oplevering,
    opmerking: notes,
  };
};

const ManageForm = ({ id }) => {
  const [{ selectedLocation }] = useAppReducer(LOCATION);

  const location = normalize(selectedLocation);
  const defaultValues = {
    ...location,
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
                <FormInput
                  key={id}
                  name={name}
                  onChange={handleChange}
                  defaultValue={defaultValues[name]}
                  {...otherProps}
                ></FormInput>
              )
            )}
          </StyledColumn>
          <StyledColumn span={6}>
            <Heading $as="h3" color="secondary">
              Maatregelen
            </Heading>
            {FormFields.filter(({ column }) => column === 2).map(
              ({ id, name, ...otherProps }) => (
                <FormInput
                  key={id}
                  name={name}
                  onChange={handleChange}
                  defaultValue={defaultValues[name]}
                  {...otherProps}
                ></FormInput>
              )
            )}
          </StyledColumn>
        </Row>
        <Row>
          <Column span={12}>
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
