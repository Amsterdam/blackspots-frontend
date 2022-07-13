import styled, { css } from 'styled-components';
import { string, any, func } from 'prop-types';
import { Label, themeSpacing, themeColor } from '@amsterdam/asc-ui';

const LabelInput = styled(Label)`
  display: ${({ hidden }) => (hidden ? 'none' : 'flex')};
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

const FormInput = ({ name, label, error, Component, ...otherProps }) => {
  return (
    <LabelInput position="top" htmlFor={name} label={label} error={error}>
      <>
        {error && <ErrorLabel>{error.message}</ErrorLabel>}
        <Component name={name} {...otherProps} />
      </>
    </LabelInput>
  );
};

FormInput.propTypes = {
  name: string,
  label: string,
  error: any,
  Component: any,
  onChange: func.isRequired,
};

export default FormInput;
