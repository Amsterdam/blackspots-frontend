import React from 'react';
import PropTypes from 'prop-types';
import { Input } from '@amsterdam/asc-ui';
import styled, { css } from 'styled-components';

const StyledInput = styled(Input)`
  ${({ width }) =>
    width &&
    css`
      width: ${width};
    `}
  ${({ height }) =>
    height &&
    css`
      height: ${height};
    `}
`;

const TextAreaInput = ({ name, value, onChange, ...otherProps }) => {
  return (
    <StyledInput
      as="textarea"
      name={name}
      value={value || ''}
      data-testid={`${name}-test-id`}
      {...otherProps}
      onChange={onChange}
    />
  );
};

TextAreaInput.defaultProps = {
  value: '',
};

TextAreaInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default TextAreaInput;
