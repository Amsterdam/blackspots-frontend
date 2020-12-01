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
    const { queryByTestId } = render(
      withTheme(<TextInput className="txtInput" {...props} />)
    );

    expect(queryByTestId('text-name-test-id').value).toEqual(props.value);
  });
});
