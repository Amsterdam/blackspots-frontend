import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Heading, Button, Row } from '@datapunt/asc-ui';
import useForm from 'react-hook-form';
import useAppReducer from 'shared/hooks/useAppReducer';
import { REDUCER_KEY as LOCATION } from 'shared/reducers/location';
import { sendData } from 'shared/api/api';
import FormFields, {
  initalValues,
  formValidation,
  formVisibility,
} from './definitions/FormFields';
import { ControlsColumn, ButtonsColumn, BottomRow } from './LocationFormStyle';
import FormInput from './components/FormInput';
import fromFeature, { toFormData, toFeature } from './services/normalize';
import { appRoutes, SpotTypes } from '../../config';

const LocationForm = ({ id: locationId }) => {
  const history = useHistory();
  const [{ selectedLocation }, actions] = useAppReducer(LOCATION);
  const [visible, setVisible] = useState({ ...formVisibility });

  const location = useMemo(() => fromFeature(selectedLocation), [
    selectedLocation,
  ]);

  const defaultValues = useMemo(
    () =>
      locationId
        ? {
            ...initalValues,
            ...location,
          }
        : {
            ...initalValues,
          },
    [location, initalValues]
  );

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
    const year = String(new Date().getFullYear());
    setValue(
      'jaar_blackspotlijst',
      SpotTypes.BLACKSPOT || spotType === SpotTypes.WEGVAK ? year : ''
    );
    setValue(
      'jaar_ongeval_quickscan',
      SpotTypes.PROTOCOL_DODELIJK || spotType === SpotTypes.PROTOCOL_ERNSTIG
        ? year
        : ''
    );
  }, [spotType]);

  const onSubmit = async data => {
    try {
      const url = `/api/blackspots/spots/${(locationId && `${data.nummer}/`) ||
        ''}`;
      const result = await sendData(
        url,
        toFormData(data),
        locationId ? 'PATCH' : 'POST'
      );

      const feature = toFeature(result);
      actions.updateLocation({ payload: feature });
      history.push(appRoutes.HOME);
    } catch (error) {
      // Dispatch the error message. This will be removed by the implementation of the error handling
      // eslint-disable-next-line no-console
      console.log('Error! ', error);
    }
  };

  const handleChange = e => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setValue(e.target.name, value);
  };

  const onReset = () => {
    history.push(appRoutes.HOME);
  };

  useEffect(() => {
    Object.entries(formValidation).forEach(([name, validation]) => {
      register({ name, type: 'custom' }, validation);
      setValue(name, defaultValues[name]);
    });
  }, [register, locationId]);

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
                  />
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
                  />
                )
            )}
          </ControlsColumn>
          <ControlsColumn
            span={{ small: 1, medium: 2, big: 6, large: 6, xLarge: 6 }}
          >
            <Heading $as="h3" color="secondary">
              Documenten
            </Heading>
            {FormFields.filter(({ column }) => column === 3).map(
              ({ id, name, ...otherProps }) =>
                visible[name] && (
                  <FormInput
                    key={id}
                    name={name}
                    onChange={handleChange}
                    value={values[name]}
                    error={errors[name]}
                    {...otherProps}
                  />
                )
            )}
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
};

LocationForm.defaultProps = {
  id: null,
};

LocationForm.propTypes = {
  id: PropTypes.string,
};

export default LocationForm;
