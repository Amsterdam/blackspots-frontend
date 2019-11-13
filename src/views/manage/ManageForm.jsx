import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Heading, Button } from '@datapunt/asc-ui';
import useForm from 'react-hook-form';
import useAppReducer from 'shared/hooks/useAppReducer';
import { REDUCER_KEY as LOCATION } from 'shared/reducers/location';
import { initalValues } from './definitions/FormFields';
import ManageFormStyle, {
  ControlsColumn,
  ButtonsColumn,
  FixedRow,
  MainRow,
} from './ManageFormStyle';
import FormFields from './definitions/FormFields';
import FormInput from './components/FormInput';
import FileInput from './components/FileInput';

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

  return (
    date &&
    date.match(regExp) &&
    new Date(
      `20${date
        .split('/')
        .reverse()
        .join('-')}`
    ).toISOString()
  );
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
      documents,
    },
  } = item;
  return {
    ...initalValues,
    naam: description,
    nummer: locatie_id,
    coordinaten: `${coordinates[1]}, ${coordinates[0]}`,
    spot_type,
    jaar_blackspotlijst,
    status: status,
    actiehouder: actiehouders,
    taken: tasks,
    start_uitvoering: getDate(start_uitvoering),
    eind_uitvoering: getDate(eind_uitvoering),
    jaar_oplevering: jaar_oplevering,
    opmerking: notes,
    rapport_document_id: documents[0] && documents[0].id,
    rapport_document_filename: documents[0] && documents[0].filename,
    design_document_id: documents[1] && documents[1].id,
    design_document_filename: documents[1] && documents[1].filename,
  };
};

const ManageForm = ({ id }) => {
  const [{ selectedLocation }] = useAppReducer(LOCATION);

  const location = normalize(selectedLocation);
  const defaultValues = {
    ...location,
  };
  const { register, handleSubmit, setValue } = useForm({
    defaultValues,
  });
  const onSubmit = data => console.log(data);
  const handleChange = e => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setValue(e.target.name, value);
  };

  useEffect(() => {
    Object.keys(initalValues).map(name => register({ name: name }));
    const documentFields = [
      'rapport_document_id',
      'rapport_document_filename',
      'design_document_id',
      'design_document_filename',
    ];
    documentFields.map(name => register({ name: name }));
  }, [register]);

  return (
    <>
      <ManageFormStyle onSubmit={handleSubmit(onSubmit)} action="" novalidate>
        <MainRow>
          <ControlsColumn
            span={{ small: 12, medium: 12, big: 6, large: 6, xLarge: 6 }}
          >
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
          </ControlsColumn>
          <ControlsColumn
            span={{ small: 12, medium: 12, big: 6, large: 6, xLarge: 6 }}
          >
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
          </ControlsColumn>
          <ControlsColumn span={12}>
            <Heading $as="h3" color="secondary">
              Documenten
            </Heading>
            <FileInput
              label="Rapportage"
              document={document[0]}
              name="rapport_document_filename"
              onChange={handleChange}
              defaultValue={defaultValues['rapport_document_filename']}
            ></FileInput>
            <FileInput
              document={document[1]}
              label="Ontwerp"
              name="design_document_filename"
              onChange={handleChange}
              defaultValue={defaultValues['design_document_filename']}
            ></FileInput>
          </ControlsColumn>
        </MainRow>
        <FixedRow>
          <ButtonsColumn span={12}>
            <Button variant="secondary" type="submit">
              Opslaan
            </Button>
            <Button variant="tertiary" type="reset">
              Annuleren
            </Button>
          </ButtonsColumn>
        </FixedRow>
      </ManageFormStyle>
    </>
  );
};

ManageForm.defaultProps = {
  id: '',
};

ManageForm.propTypes = {
  id: PropTypes.string,
};

export default ManageForm;
