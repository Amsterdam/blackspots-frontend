import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Heading, Button, Row } from '@datapunt/asc-ui';
import useForm from 'react-hook-form';
import useAppReducer from 'shared/hooks/useAppReducer';
import { REDUCER_KEY as LOCATION } from 'shared/reducers/location';
import {
  initalValues,
  formValidation,
  formVisibility,
} from './definitions/FormFields';
import { ControlsColumn, ButtonsColumn, BottomRow } from './LocationFormStyle';
import FormFields from './definitions/FormFields';
import FormInput from './components/FormInput';
import FileInput from './components/FileInput';
import fromFeature, { toFormData, toFeature } from './services/normalize';
import { sendData } from 'shared/api/api';
import { appRoutes, SpotTypes } from '../../constants';

const LocationForm = withRouter(({ id, history }) => {
  const [{ selectedLocation }, actions] = useAppReducer(LOCATION);
  const [visible, setVisible] = useState({ ...formVisibility });

  const location = useMemo(() => fromFeature(selectedLocation), [
    selectedLocation,
  ]);
  const defaultValues = useMemo(
    () =>
      id
        ? {
            ...initalValues,
            ...location,
          }
        : {
            ...initalValues,
          },
    []
  );

  console.log('defaultValues', defaultValues, location);
  const { register, handleSubmit, setValue, errors, watch } = useForm({
    ...defaultValues,
  });

  const values = watch(Object.keys(defaultValues), defaultValues);

  const spotType = watch('spot_type');
  useEffect(() => {
    setVisible(v => ({
      ...v,
      jaar_blackspotlijst:
        spotType === SpotTypes.BLACKSPOT || spotType === SpotTypes.WEGVAK,
      jaar_ongeval_quickscan:
        spotType === SpotTypes.PROTOCOL_DODELIJK ||
        spotType === SpotTypes.PROTOCOL_ERNSTIG,
    }));
    setValue(
      'jaar_blackspotlijst',
      SpotTypes.BLACKSPOT || spotType === SpotTypes.WEGVAK ? '1994' : ''
    );
    setValue('jaar_ongeval_quickscan', '');
  }, [spotType]);

  const onSubmit = async data => {
    return console.log('onSubmit', data);
    try {
      const url = `/api/blackspots/spots/${(id && data.nummer + '/') || ''}`;
      const location = await sendData(
        url,
        toFormData(data),
        id ? 'PATCH' : 'POST'
      );

      const feature = toFeature(location);
      actions.updateLocation({ payload: feature });
      history.push(appRoutes.HOME);
    } catch (error) {
      // Dispatch the error message. This will be removed by the implementation of the error handling
      console.log('Error! ', error);
    }
  };

  const handleChange = e => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setValue(e.target.name, value);
    console.log('handleChange', e.target.name, value);
  };

  const onReset = () => {
    history.push(appRoutes.HOME);
  };

  useEffect(() => {
    Object.entries(formValidation).forEach(([name, val]) => {
      register({ name, type: 'custom' });
      setValue(name, defaultValues[name]);
    });
    ['rapport_document', 'design_document'].forEach(name => {
      register({ name, type: 'custom' });
      setValue(name, defaultValues[name]);
    });
  }, [register, id]);

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
              ({ id, name, ...otherProps }) =>
                visible[name] && (
                  <FormInput
                    key={id}
                    name={name}
                    onChange={handleChange}
                    value={values[name]}
                    error={errors[name]}
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
              ({ id, name, ...otherProps }) =>
                visible[name] && (
                  <FormInput
                    key={id}
                    name={name}
                    onChange={handleChange}
                    value={values[name]}
                    error={errors[name]}
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
              value={values['rapport_document']}
            />
            <FileInput
              label="Ontwerp"
              name="design_document"
              onChange={handleChange}
              value={values['design_document']}
            />
          </ControlsColumn>
        </Row>
        <BottomRow>
          <ButtonsColumn span={12}>
            <Button variant="secondary" type="submit">
              Opslaan
            </Button>
            <Button variant="tertiary" type="button" onClick={onReset}>
              Annuleren
            </Button>
          </ButtonsColumn>
        </BottomRow>
      </form>
    </>
  );
});

LocationForm.defaultProps = {
  id: null,
};

LocationForm.propTypes = {
  id: PropTypes.string,
};

export default LocationForm;
