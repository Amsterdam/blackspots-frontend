import React from 'react';
import { Button, Heading, Row, Column } from '@datapunt/asc-ui';
import { Formik } from 'formik';
import ManageFormStyle, { Label, StyledColumn } from './ManageFormStyle';
import FormFields, { initalValues } from './FormFields';
import useAppReducer from 'shared/hooks/useAppReducer';
import { REDUCER_KEY as LOCATION } from 'shared/reducers/location';

const FormField = ({ name, label, Component, errors, ...otherProps }) => {
  return (
    <Label>
      {label} {errors && `- ${errors}`}
      <Component name={name} {...otherProps} />
    </Label>
  );
};

const ManageFormBase = ({
  touched,
  errors,
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  setFieldValue,
}) => {
  return (
    <ManageFormStyle onSubmit={handleSubmit} action="" novalidate>
      <Row wrap>
        <StyledColumn span={6} direction="vertical">
          <Heading $as="h3" color="secondary">
            Locatie
          </Heading>
          {FormFields.filter(({ column }) => column === 1).map(
            ({ name, customOnChange, ...fieldProps }) => (
              <FormField
                {...fieldProps}
                name={name}
                onChange={customOnChange ? setFieldValue : handleChange}
                onBlur={handleBlur}
                value={values[name]}
                errors={errors[name]}
                touched={touched[name]}
              ></FormField>
            )
          )}
        </StyledColumn>
        <StyledColumn span={6}>
          <Heading $as="h3" color="secondary">
            Maatregelen
          </Heading>
          {FormFields.filter(({ column }) => column === 2).map(
            ({ name, customOnChange, ...fieldProps }) => (
              <FormField
                {...fieldProps}
                name={name}
                onChange={customOnChange ? setFieldValue : handleChange}
                onBlur={handleBlur}
                value={values[name]}
                errors={errors[name]}
                touched={touched[name]}
              ></FormField>
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
  );
};

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
  const [state] = useAppReducer(LOCATION);

  const initialV = normalize(state.selectedLocation);
  console.log('initial values:', initialV);
  return (
    <>
      <Heading>Toevoegen/Wijzigen</Heading>
      <Formik
        initalValues={initialV}
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
          return <ManageFormBase {...formProps} />;
        }}
      />
    </>
  );
};

export default ManageForm;
