import React from 'react';
import styled, { css } from '@datapunt/asc-core';
import { Label, themeSpacing, themeColor } from '@datapunt/asc-ui';

const LabelInput = styled(Label)`
  ${({ hidden }) =>
    hidden
      ? css`
          display: none;
        `
      : css`
          display: flex;
        `};
  flex-direction: column;
  margin-bottom: ${themeSpacing(6)};
  font-weight: bold;
  align-items: flex-start;
  width: 100%;

  ${({ error }) =>
    error &&
    css`
      padding-left: ${themeSpacing(4)};
      border-left: 2px solid ${themeColor('secondary')};
    `}

  & > :first-child {
    margin-bottom: ${themeSpacing(2)};
  }
`;

const ErrorLabel = styled.span`
  font-weight: 400;
  color: ${themeColor('secondary')};
  margin-bottom: ${themeSpacing(2)};
`;

export const FormInput = ({
  name,
  label,
  defaultValue,
  error,
  hidden,
  Component,
  ...otherProps
}) => {
  return (
    <LabelInput position="top" htmlFor={name} label={label} error={error} hidden={hidden}>
      <>
        {error && <ErrorLabel>{error.message}</ErrorLabel>}
        <Component name={name} defaultValue={defaultValue} {...otherProps} />
      </>
    </LabelInput>
  );
};

export default FormInput;
