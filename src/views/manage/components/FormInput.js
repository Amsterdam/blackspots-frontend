import React from 'react';

export const FormInput = ({ name, Component, ...otherProps }) => {
  return <Component name={name} {...otherProps} />;
};

export default FormInput;
