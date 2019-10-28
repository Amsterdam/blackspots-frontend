import React from 'react';
import { Label, List, ListItem, themeSpacing } from '@datapunt/asc-ui';
import styled from '@datapunt/asc-core';

const RadioInputStyle = styled.input`
  margin-right: ${themeSpacing(2)};
`;

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

const RadioGroupField = ({ label: groupLabel, name, options, onChange }) => {
  return (
    <Label label={groupLabel} position="top" align-items="flex-start">
      <List>
        {options.map(option => {
          const { label, value } = option;
          return (
            <ListItem>
              <RadioInput
                key={value}
                name={name}
                label={label}
                value={value}
                onChange={onChange}
              />
            </ListItem>
          );
        })}
      </List>
    </Label>
  );
};

export default RadioGroupField;
