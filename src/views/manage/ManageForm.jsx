import React from 'react';
import { Button, Heading, Row, Column, Typography } from '@datapunt/asc-ui';
import { Formik } from 'formik';
import ManageFormStyle, { Label, StyledColumn } from './ManageFormStyle';
import FormFields, { initalValues } from './FormFields';

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
      clg
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

const ManageForm = () => {
  return (
    <>
      <Heading>Toevoegen/Wijzigen</Heading>
      <Formik
        initalValues={initalValues}
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
          console.log('fieldProps', formProps);
          return <ManageFormBase {...formProps} />;
        }}
      />
    </>
  );
};

export default ManageForm;
