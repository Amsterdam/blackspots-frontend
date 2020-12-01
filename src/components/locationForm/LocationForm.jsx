import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Button, Row } from '@amsterdam/asc-ui';
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
import {
  featureToLocation,
  locationToFormData,
  locationToFeature,
} from './services/normalize';
import { appRoutes, SpotTypes, endpoints } from '../../config';
import { HeaderSecondary } from '../../styles/SharedStyles';

const isBlackspotType = spotType =>
  spotType === SpotTypes.BLACKSPOT || spotType === SpotTypes.WEGVAK;
const isProtocolType = spotType =>
  spotType === SpotTypes.PROTOCOL_DODELIJK ||
  spotType === SpotTypes.PROTOCOL_ERNSTIG;

const LocationForm = ({ id: locationId }) => {
  const history = useHistory();
  const [{ selectedLocation }, actions] = useAppReducer(LOCATION);
  const [visible, setVisible] = useState({ ...formVisibility });

  const location = useMemo(() => featureToLocation(selectedLocation), [
    selectedLocation,
  ]);

  // Return to home when navigating to a not selected location
  useEffect(() => {
    if (locationId && !selectedLocation) {
      history.push(appRoutes.HOME);
    }
  }, [history, locationId, selectedLocation]);

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
    [location, locationId]
  );

  const {
    register,
    unregister,
    handleSubmit,
    setValue,
    errors,
    watch,
    triggerValidation,
  } = useForm({
    ...defaultValues,
  });

  const values = watch(Object.keys(defaultValues), defaultValues);

  const spotType = watch('spot_type');
  useEffect(() => {
    setVisible(v => ({
      ...v,
      jaar_blackspotlijst: isBlackspotType(spotType),
      jaar_ongeval_quickscan: isProtocolType(spotType),
    }));

    const year = String(new Date().getFullYear());

    if (isBlackspotType(spotType) && !values.jaar_blackspotlijst) {
      setValue('jaar_blackspotlijst', year);
      setValue('jaar_ongeval_quickscan', '');
    }

    if (isProtocolType(spotType) && !values.jaar_ongeval_quickscan) {
      setValue('jaar_blackspotlijst', '');
      setValue('jaar_ongeval_quickscan', year);
    }

    if (!isBlackspotType(spotType) && !isProtocolType(spotType)) {
      setValue('jaar_blackspotlijst', '');
      setValue('jaar_ongeval_quickscan', '');
    }
  }, [spotType, setValue, values.jaar_blackspotlijst, values.jaar_ongeval_quickscan]);

  const coordinaten = watch('coordinaten');
  useEffect(() => {
    (async () => {
      setVisible(v => ({
        ...v,
        stadsdeel: false,
      }));
      setValue('stadsdeel', '', true);
      unregister('stadsdeel');
    })();
  }, [coordinaten, setValue, unregister]);

  const handleServerValidation = async reason => {
    if (reason.point && reason.point.length) {
      // add the extra stadsdeel
      setVisible(v => ({
        ...v,
        stadsdeel: true,
      }));
      register(
        { name: 'stadsdeel', type: 'custom' },
        { required: reason.point[0] }
      );
      setValue('stadsdeel', '', true);
      await triggerValidation({ name: 'stadsdeel' });
    }
  };

  const onSubmit = async data => {
    try {
      const route = `${(locationId && `${locationId}/`) || ''}`;
      const url = `${endpoints.blackspots}${route}`;
      const result = await sendData(
        url,
        locationToFormData({ ...data, id: locationId }),
        locationId ? 'PATCH' : 'POST'
      );

      if (!result.errors) {
        const feature = locationToFeature(result);
        actions.updateLocation({ payload: feature });
        history.push(appRoutes.HOME);
      }
    } catch (error) {
      const { status, reason } = error;
      if (status === 400) {
        await handleServerValidation(reason);
      } else {
        // TODO implement show general error on screen (WK-274)
        // eslint-disable-next-line no-console
        console.error('Unhandled error when submitting the form! ', error);
      }
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
  }, [register, locationId, defaultValues, setValue]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} action="" noValidate>
        <Row>
          <ControlsColumn
            span={{ small: 1, medium: 2, big: 6, large: 6, xLarge: 6 }}
          >
            <HeaderSecondary forwardedAs="h3">> Locatie</HeaderSecondary>
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
            <HeaderSecondary forwardedAs="h3">
              Maatregelen
            </HeaderSecondary>
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
            <HeaderSecondary forwardedAs="h3">Documenten</HeaderSecondary>
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
            <input type="hidden" value={JSON.stringify(errors)} />
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
