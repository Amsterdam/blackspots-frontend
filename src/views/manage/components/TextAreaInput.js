import React from 'react';
import { Label } from '@datapunt/asc-ui';
import { styles } from '@datapunt/asc-ui';

const { InputStyle } = styles;

const TextAreaInput = ({ name, label, ...otherProps }) => {
  return (
    <Label position="top" htmlFor={name} label={label} align="flex-start">
      <InputStyle as="textarea" name={name} {...otherProps} />
    </Label>
  );
};

export default TextAreaInput;
