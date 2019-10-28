import React from 'react';
import { Label, List, ListItem } from '@datapunt/asc-ui';
import styled from '@datapunt/asc-core';

const RadioInputStyle = styled.input``;

const RadioInput = ({
  name,
  label,
  value,
  onChange,
  defaultValue,
  checked,
}) => {
  return (
    <Label htmlFor={name} label={label} position="right">
      <RadioInputStyle
        id={name}
        name={name}
        type="radio"
        value={value}
        checked={checked}
        onChange={onChange}
      />
    </Label>
  );
};

export const RadioGroup = ({ label, children }) => {
  return (
    <>
      <Label label={label} position="top" align-items="flex-start">
        <List>
          {children.map(child => (
            <ListItem>{child}</ListItem>
          ))}
        </List>
      </Label>
    </>
  );
};

export default RadioInput;
