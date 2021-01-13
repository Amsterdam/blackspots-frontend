import styled, { css } from '@datapunt/asc-core';
import { Input } from '@datapunt/asc-ui';
import PropTypes from 'prop-types';
import React from 'react';

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

const TextInput = ({ name, value, onChange, ...otherProps }) => {
  return (
    <StyledInput
      name={name}
      value={value || ''}
      data-testid={`${name}-test-id`}
      {...otherProps}
      onChange={onChange}
    />
  );
};

TextInput.defaultProps = {
  value: '',
};
TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
};

export default TextInput;
