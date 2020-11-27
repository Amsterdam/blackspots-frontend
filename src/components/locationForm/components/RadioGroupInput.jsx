import React from 'react';
import { Label, List, ListItem, themeSpacing } from '@datapunt/asc-ui';
import styled from 'styled-components';

const RadioLabelStyle = styled(Label)`
  font-weight: normal;

  & > :first-child {
    margin: 0;
    padding-top: 5px;
  }
`;

const RadioInputStyle = styled.input`
  margin-right: ${themeSpacing(2)};
`;

const RadioGroupInputStyle = styled(List)`
  margin-bottom: 0;
`;

const RadioInput = ({ name, label, value, onChange, checked }) => {
  return (
    <RadioLabelStyle htmlFor={value} label={label} position="right">
      <RadioInputStyle
        className="ristyle"
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

const RadioGroupInput = ({ name, value: selectedValue, options, onChange }) => {
  return (
    <RadioGroupInputStyle>
      {options.map(option => {
        const { label, value } = option;
        return (
          <ListItem key={value}>
            <RadioInput
              name={name}
              label={label}
              value={value}
              checked={selectedValue === value}
              onChange={onChange}
            />
          </ListItem>
        );
      })}
    </RadioGroupInputStyle>
  );
};

export default RadioGroupInput;
