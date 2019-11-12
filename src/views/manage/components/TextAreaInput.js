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

const TextAreaInput = ({ name, label, ...otherProps }) => {
  return <StyledInput as="textarea" name={name} {...otherProps} />;
};

export default TextAreaInput;
