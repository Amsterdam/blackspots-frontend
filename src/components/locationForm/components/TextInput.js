import React from 'react';
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

const TextInput = ({ name, label, ...otherProps }) => {
  return <StyledInput name={name} {...otherProps} />;
};

export default TextInput;
