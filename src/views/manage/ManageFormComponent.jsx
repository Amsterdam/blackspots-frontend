import React from 'react';
import { Button, Heading, Row, Column } from '@datapunt/asc-ui';
import ManageFormStyle, { StyledColumn } from './ManageFormStyle';
import FormFields, { FormField } from './FormFields';

const ManageFormComponent = ({
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

export default ManageFormComponent;
