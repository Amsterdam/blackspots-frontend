import React from 'react';
import { render } from '@testing-library/react';
import { withTheme } from 'test/utils';

import TextInput from './TextInput';

describe('TextInput', () => {
  const props = {
    name: 'text-name',
    value: 'text-value',
    label: 'text-label',
    onChange: jest.fn(),
  };
  it('renders correctly', () => {
    const { container } = render(
      withTheme(<TextInput className="txtInput" {...props} />)
    );

    expect(container.querySelector('input[type="text"].txtInput')).toBeTruthy();
  });
});
