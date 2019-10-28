import React from 'react';
import { Button, Heading, Row, Column } from '@datapunt/asc-ui';
import ManageFormStyle, { StyledColumn } from './ManageFormStyle';
import FormFields, { FormField } from './FormFields';

const ManageFormComponent = ({ handleChange, onSubmit }) => {
  return (
    <ManageFormStyle onSubmit={onSubmit} action="" novalidate>
      <Row>
        <StyledColumn span={6} direction="vertical">
          <Heading $as="h3" color="secondary">
            Locatie
          </Heading>
          {FormFields.filter(({ column }) => column === 1).map(
            ({ id, name, ...fieldProps }) => (
              <FormField
                key={id}
                {...fieldProps}
                name={name}
                onChange={handleChange}
              ></FormField>
            )
          )}
        </StyledColumn>
        <StyledColumn span={6}>
          <Heading $as="h3" color="secondary">
            Maatregelen
          </Heading>
          {FormFields.filter(({ column }) => column === 2).map(
            ({ id, name, ...fieldProps }) => (
              <FormField
                key={id}
                {...fieldProps}
                name={name}
                onChange={handleChange}
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
