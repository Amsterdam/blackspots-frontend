import React, { useEffect, useState } from 'react';
import { Label, List, ListItem, themeSpacing, styles } from '@datapunt/asc-ui';
import styled from '@datapunt/asc-core';

const RadioLabelStyle = styled(Label)`
  font-weight: normal;
`;

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
    <RadioLabelStyle htmlFor={value} label={label} position="right">
      <RadioInputStyle
        id={value}
        name={name}
        type="radio"
        value={value}
        checked={checked}
        onChange={onChange}
      />
    </RadioLabelStyle>
  );
};

const RadioGroupInput = ({
  label: groupLabel,
  name,
  options,
  onChange,
  defaultValue,
}) => {
  const [selectedValue, setSelectedValue] = useState();
  useEffect(() => {
    setSelectedValue(defaultValue);
  }, [defaultValue]);
  return (
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
              checked={selectedValue === value}
              onChange={e => {
                setSelectedValue(e.target.value);
                onChange(e);
              }}
            />
          </ListItem>
        );
      })}
    </List>
  );
};

export default RadioGroupInput;
