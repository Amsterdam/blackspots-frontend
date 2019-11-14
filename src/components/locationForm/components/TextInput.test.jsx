import React from 'react';
import { render } from '@testing-library/react';
import { withTheme } from 'test/utils';

import TextInput from './TextInput';

describe('TextInput', () => {
  it('renders correctly', () => {
    const { container } = render(withTheme(<TextInput className="txtInput" />));

    expect(container.querySelector('input[type="text"].txtInput')).toBeTruthy();
  });
});
