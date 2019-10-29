import React from 'react';
import { Input, Label } from '@datapunt/asc-ui';

const TextInput = ({ name, label, ...otherProps }) => {
  return (
    <Label position="top" htmlFor={name} label={label} align="flex-start">
      <Input name={name} {...otherProps} />
    </Label>
  );
};

export default TextInput;
