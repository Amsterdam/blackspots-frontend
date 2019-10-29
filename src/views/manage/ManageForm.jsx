import React from 'react';
import { Heading } from '@datapunt/asc-ui';
import { Formik } from 'formik';
import { initalValues } from './FormFields';
import useAppReducer from 'shared/hooks/useAppReducer';
import { REDUCER_KEY as LOCATION } from 'shared/reducers/location';
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
  };
};

const ManageForm = ({ id }) => {
  const [{ selectedLocation }] = useAppReducer(LOCATION);

  const location = normalize(selectedLocation);

  return (
    <>
      <Heading>Toevoegen/Wijzigen</Heading>
      <Formik
        initalValues={location}
        validate={values => {
          let errors = {};
          if (!values.naam) errors.naam = 'verplicht';
          return errors;
        }}
        onSubmit={values => {
          console.log('onSubmit', values);
        }}
        render={({
          touched,
          errors,
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
        }) => {
          const formProps = {
            touched,
            errors,
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
          };
          return <ManageFormComponent {...formProps} />;
        }}
      />
    </>
  );
};

export default ManageForm;
