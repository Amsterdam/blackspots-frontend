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

const TextInput = ({ name, label, defaultValue, onChange, ...otherProps }) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(defaultValue || '');
  }, [defaultValue]);

  const onValueChange = e => {
    setValue(e.target.value);
    onChange(e);
  };

  return (
    <StyledInput
      name={name}
      value={value}
      data-testid={`${name}-test-id`}
      {...otherProps}
      onChange={onValueChange}
    />
  );
};

TextInput.defaultValues = {
  defaultValue: ''
};

TextInput.propTypes = {
  defaultValue: PropTypes.any
}

export default TextInput;
