import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Heading, Button, Row } from '@datapunt/asc-ui';
import useForm from 'react-hook-form';
import useAppReducer from 'shared/hooks/useAppReducer';
import { REDUCER_KEY as LOCATION } from 'shared/reducers/location';
import { initalValues } from './definitions/FormFields';
import { ControlsColumn, ButtonsColumn, BottomRow } from './LocationFormStyle';
import FormFields from './definitions/FormFields';
import FormInput from './components/FormInput';
import FileInput from './components/FileInput';
import fromFeature, { toFormData } from './services/normalize';
import { sendData } from 'shared/api/api';


const LocationForm = ({ id }) => {
  const [{ selectedLocation }] = useAppReducer(LOCATION);

  const location = fromFeature(selectedLocation);
  const defaultValues = {
    ...location,
  };
  const { register, handleSubmit, setValue } = useForm({
    defaultValues,
  });

  const onSubmit = async data => {
    try {
      const url = `/api/blackspots/spots/${data.nummer}/`;
      await sendData(url, toFormData(data), 'PATCH');
    } catch (error) {
      // Dispatch the error message. console.log('Error! ', error);
    }
  };

  const handleChange = e => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setValue(e.target.name, value);
  };

  useEffect(() => {
    Object.keys(initalValues).map(name => register({ name }));
    ['rapport_document', 'design_document'].map(name => register({ name }));
  }, [register]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} action="" noValidate>
        <Row>
          <ControlsColumn
            span={{ small: 1, medium: 2, big: 6, large: 6, xLarge: 6 }}
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
            span={{ small: 1, medium: 2, big: 6, large: 6, xLarge: 6 }}
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
          <ControlsColumn
            span={{ small: 1, medium: 2, big: 6, large: 6, xLarge: 6 }}
          >
            <Heading $as="h3" color="secondary">
              Documenten
            </Heading>
            <FileInput
              label="Rapportage"
              name="rapport_document"
              onChange={handleChange}
              defaultValue={defaultValues['rapport_document']}
            />
            <FileInput
              label="Ontwerp"
              name="design_document"
              onChange={handleChange}
              defaultValue={defaultValues['design_document']}
            />
          </ControlsColumn>
        </Row>
        <BottomRow>
          <ButtonsColumn span={12}>
            <Button variant="secondary" type="submit">
              Opslaan
            </Button>
            <Button variant="tertiary" type="reset">
              Annuleren
            </Button>
          </ButtonsColumn>
        </BottomRow>
      </form>
    </>
  );
};

LocationForm.defaultProps = {
  id: '',
};

LocationForm.propTypes = {
  id: PropTypes.string,
};

export default LocationForm;
