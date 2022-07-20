import { useEffect, useState, useMemo, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Button, Row } from '@amsterdam/asc-ui';
import { useForm } from 'react-hook-form';
import { FilterContext } from 'shared/reducers/FilterContext';
import { actions } from 'shared/reducers/filter';
import { sendData } from 'shared/api/api';
import { appRoutes, endpoints } from '../../config';
import { HeaderSecondary } from '../../styles/SharedStyles';
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
import useManageCoordinatePolygonVisabillity from './hooks/useManageCoordinatePolygonVisabillity';
import { useManageSpotType } from './hooks/useManageSpotType';

const LocationForm = () => {
  const {
    state: { selectedLocation },
    dispatch,
  } = useContext(FilterContext);

  const params = useParams();
  const locationId = params.id;

  const navigate = useNavigate();
  const [visible, setVisible] = useState({ ...formVisibility });
  const location = useMemo(
    () => featureToLocation(selectedLocation),
    [selectedLocation]
  );

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
    formState: { errors },
    watch,
    trigger,
    setError,
    clearErrors,
  } = useForm({
    defaultValues,
  });

  useEffect(() => {
    if (!locationId && selectedLocation) {
      dispatch(actions.selectLocation(null));
    }
  }, [locationId, dispatch, selectedLocation]);

  const values = watch();

  const spotType = watch('spot_type');
  useManageSpotType({
    spotType,
    setVisible,
    setValue,
    defaultValues,
  });

  useManageCoordinatePolygonVisabillity({
    setVisible,
    watch,
    register,
    unregister,
  });

  const handleServerValidation = async (reason) => {
    if (reason.point && reason.point.length) {
      // add the extra stadsdeel
      setVisible((v) => ({
        ...v,
        stadsdeel: true,
      }));
      register('stadsdeel', { type: 'custom' }, { required: reason.point[0] });
      setValue('stadsdeel', '', true);
      await trigger('stadsdeel');
      setError(
        'stadsdeel',
        { type: 'custom', message: reason.point[0] },
        { shouldFocus: true }
      );
    } else {
      Object.keys(reason).forEach((fieldId) => {
        setError(
          fieldId,
          { type: 'custom', message: reason[fieldId] },
          { shouldFocus: true }
        );
      });
    }
  };

  const onSubmit = async (data) => {
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
        if (locationId) {
          dispatch(actions.updateLocation(feature));
        } else {
          dispatch(actions.addLocation(feature));
        }
        navigate(appRoutes.HOME);
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

  const handleChange = (e) => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    clearErrors(e.target.name);
    setValue(e.target.name, value);
  };

  const onReset = () => {
    navigate(appRoutes.HOME);
  };

  useEffect(() => {
    Object.entries(formValidation).forEach(([name, validation]) => {
      register(name, validation);
      setValue(name, locationId ? defaultValues[name] : initalValues[name]);
    });
  }, [locationId, defaultValues, setValue, register]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} action="" noValidate>
        <Row>
          <ControlsColumn
            span={{ small: 1, medium: 2, big: 6, large: 6, xLarge: 6 }}
          >
            <HeaderSecondary forwardedAs="h3">&gt; Locatie</HeaderSecondary>
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
            <HeaderSecondary forwardedAs="h3">Maatregelen</HeaderSecondary>
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
