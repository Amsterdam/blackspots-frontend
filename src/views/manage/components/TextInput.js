import React from 'react';
import { Input } from '@datapunt/asc-ui';

const TextInput = ({ name, label, ...otherProps }) => {
  return <Input name={name} {...otherProps} />;
};

export default TextInput;
