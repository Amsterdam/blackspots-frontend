import { useEffect, useState, useMemo, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Button, Row } from '@amsterdam/asc-ui';
import { useForm } from 'react-hook-form';
import { FilterContext } from 'shared/reducers/FilterContext';
import { actions } from 'shared/reducers/filter';
import { sendData } from 'shared/api/api';
import { appRoutes, SpotTypes, endpoints } from '../../config';
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

const isBlackspotType = (spotType) =>
  spotType === SpotTypes.BLACKSPOT || spotType === SpotTypes.WEGVAK;
const isProtocolType = (spotType) =>
  spotType === SpotTypes.PROTOCOL_DODELIJK ||
  spotType === SpotTypes.PROTOCOL_ERNSTIG;

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
    formState: { errors } ,
    watch,
    trigger,
  } = useForm({
    ...defaultValues,
  });

  useEffect(() => {
    if (!locationId && selectedLocation) {
      dispatch(actions.selectLocation(null));
    }
  }, [locationId, dispatch, selectedLocation]);

  const values = watch(Object.keys(defaultValues), defaultValues);
  const newValues = { 
    naam: values[0], 
    nummer: values[1], 
    coordinaten: values[2], 
    stadsdeel: values[3],
    spot_type: values[4],
    jaar_blackspotlijst: values[5], 
    jaar_ongeval_quickscan: values[6],
    status: values[7],
    actiehouder: values[8],
    taken: values[9],
    start_uitvoerin: values[10],
    eind_uitvoering: values[11],
    jaar_oplevering: values[12],
    opmerking: values[13],
    rapport_document: values[14],
    design_document: values[15],
    id: locationId
  };
  
  const spotType = watch('spot_type');
  useEffect(() => {
    setVisible((v) => ({
      ...v,
      jaar_blackspotlijst: isBlackspotType(spotType),
      jaar_ongeval_quickscan: isProtocolType(spotType),
    }));

    const year = String(new Date().getFullYear());

    if (isBlackspotType(spotType) && !newValues.jaar_blackspotlijst) {
      setValue('jaar_blackspotlijst', year);
      setValue('jaar_ongeval_quickscan', '');
    }

    if (isProtocolType(spotType) && !newValues.jaar_ongeval_quickscan) {
      setValue('jaar_blackspotlijst', '');
      setValue('jaar_ongeval_quickscan', year);
    }

    if (!isBlackspotType(spotType) && !isProtocolType(spotType)) {
      setValue('jaar_blackspotlijst', '');
      setValue('jaar_ongeval_quickscan', '');
    }
  }, [
    spotType,
    newValues.jaar_blackspotlijst,
    newValues.jaar_ongeval_quickscan,
    setValue,
  ]);

  const coordinaten = watch('coordinaten');
  useEffect(() => {
    (async () => {
      setVisible((v) => ({
        ...v,
        stadsdeel: false,
      }));
      setValue('stadsdeel', '', true);
      unregister('stadsdeel');
    })();
  }, [coordinaten, setValue, unregister]);

  const handleServerValidation = async (reason) => {
    if (reason.point && reason.point.length) {
      // add the extra stadsdeel
      setVisible((v) => ({
        ...v,
        stadsdeel: true,
      }));
      register('stadsdeel', 
        { type: 'custom' },
        { required: reason.point[0] }
      );
      setValue('stadsdeel', '', true);
      await trigger('stadsdeel');
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
                    value={newValues[name]}
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
                    value={newValues[name]}
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
                    value={newValues[name]}
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
