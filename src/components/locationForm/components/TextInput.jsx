import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'
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

const TextInput = ({ name, label, value, onChange, ...otherProps }) => {
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

export default TextInput;
