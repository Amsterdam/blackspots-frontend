import React from 'react';
import styled from '@datapunt/asc-core';
import { Label, themeSpacing } from '@datapunt/asc-ui';

const LabelInput = styled(Label)`
  margin-bottom: ${themeSpacing(6)};
  font-weight: bold;
  align-items: flex-start;
  width: 100%;

  & > :first-child {
    margin-bottom: ${themeSpacing(2)};
  }
`;

export const FormInput = ({ name, label,defaultValue, Component, ...otherProps }) => {
  return (
    <LabelInput position="top" htmlFor={name} label={label}>
      <Component name={name} defaultValue={defaultValue} {...otherProps} />
    </LabelInput>
  );
};

export default FormInput;
