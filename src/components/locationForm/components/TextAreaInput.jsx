import React, { useEffect, useState } from 'react';
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

const TextAreaInput = ({
  name,
  label,
  defaultValue,
  onChange,
  ...otherProps
}) => {
  const [value, setValue] = useState(null);

  useEffect(() => {
    setValue(defaultValue || '');
  }, [defaultValue]);

  const onValueChange = e => {
    setValue(e.target.value);
    onChange(e);
  };

  return (
    <StyledInput
      as="textarea"
      name={name}
      value={value}
      data-testid={`${name}-test-id`}
      {...otherProps}
      onChange={onValueChange}
    />
  );
};

export default TextAreaInput;
