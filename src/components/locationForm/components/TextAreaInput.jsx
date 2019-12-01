import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Input } from '@datapunt/asc-ui';
import styled, { css } from '@datapunt/asc-core';

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

TextAreaInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TextAreaInput;
