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

const TextAreaInput = ({
  name,
  label,
  defaultValue,
  onChange,
  ...otherProps
}) => {
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
      as="textarea"
      name={name}
      value={value}
      data-testid={`${name}-test-id`}
      {...otherProps}
      onChange={onValueChange}
    />
  );
};

TextAreaInput.defaultValues = {
  defaultValue: ''
};

TextAreaInput.propTypes = {
  defaultValue: PropTypes.string
}

export default TextAreaInput;
