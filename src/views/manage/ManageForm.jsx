import React from 'react';
import styled from '@datapunt/asc-core';
import { Input, Button, Heading, Row, Column } from '@datapunt/asc-ui';
import TextArea from './TextArea';
import DatePickerInput from './DatePickerInput';
import { Formik } from 'formik';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background-color: yellow;
  width: 100%;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  margin: 0.5em 0;
  position: relative;
`;

const StyledColumn = styled(Column)`
  display: flex;
  flex-direction: column;
`;

const FormField = ({ name, label, Component, errors, ...otherProps }) => {
  return (
    <Label>
      {label} {errors && `- ${errors}`}
      <Component name={name} {...otherProps} />
    </Label>
  );
};

const fields = [
  {
    name: 'naam',
    label: 'Naam',
    Component: Input,
  },
  {
    name: 'nummer',
    label: 'Nummer',
    Component: Input,
  },
  {
    name: 'coordinaten',
    label: 'Coordinaten',
    Component: Input,
  },
];
const fields2 = [
  {
    name: 'actiehouder',
    label: 'Actiehouder',
    Component: Input,
  },
  {
    name: 'taken',
    label: 'Taken',
    Component: TextArea,
  },
  {
    name: 'startDate',
    label: 'Start uitvoering',
    Component: DatePickerInput,
    customOnChange: true,
  },
];

const initalValues = {
  ...fields.reduce(
    (acc, item) => ({
      ...acc,
      [item.naam]: '',
    }),
    {}
  ),
};

const ManageForm = () => {
  return (
    <>
      <Heading>Toevoegen/Wijzigen</Heading>
      <Formik
        initalValues={{
          ...initalValues,
        }}
        validate={values => {
          console.log('validate', values);
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
          return (
            <Form
              onSubmit={handleSubmit}
              action=""
              novalidate
              // onReset={() => console.log('onReset')}
            >
              <Row wrap debug>
                <StyledColumn debug span={6} direction="vertical">
                  <Heading $as="h3" color="secondary">
                    Locatie
                  </Heading>
                  {fields.map(({ name, customOnChange, ...fieldProps }) => (
                    <FormField
                      {...fieldProps}
                      name={name}
                      onChange={customOnChange ? setFieldValue : handleChange}
                      onBlur={handleBlur}
                      value={values[name]}
                      errors={errors[name]}
                      touched={touched[name]}
                    ></FormField>
                  ))}
                </StyledColumn>
                <StyledColumn span={6}>
                  <Heading $as="h3" color="secondary">
                    Maatregelen
                  </Heading>
                  {fields2.map(({ name, customOnChange, ...fieldProps }) => (
                    <FormField
                      {...fieldProps}
                      name={name}
                      onChange={customOnChange ? setFieldValue : handleChange}
                      onBlur={handleBlur}
                      value={values[name]}
                      errors={errors[name]}
                      touched={touched[name]}
                    ></FormField>
                  ))}
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
            </Form>
          );
        }}
      />
    </>
  );
};

export default ManageForm;
