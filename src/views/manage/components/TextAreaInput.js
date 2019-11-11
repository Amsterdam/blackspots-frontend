import React from 'react';
import { Input } from '@datapunt/asc-ui';

const TextAreaInput = ({ name, label, ...otherProps }) => {
  return <Input as="textarea" name={name} {...otherProps} />;
};

export default TextAreaInput;
