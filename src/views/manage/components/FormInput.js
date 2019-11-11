import React from 'react';
import styled from '@datapunt/asc-core';
import { Label, themeSpacing } from '@datapunt/asc-ui';

const LabelInput = styled(Label)`
  margin-bottom: ${themeSpacing(6)};
  font-weight: bold;
  align-items: flex-start;

  & > :first-child {
    margin-bottom: ${themeSpacing(2)};
  }
`;

export const FormInput = ({ name, label, Component, ...otherProps }) => {
  return (
    <LabelInput position="top" htmlFor={name} label={label}>
      <Component name={name} {...otherProps} />
    </LabelInput>
  );
};

export default FormInput;
