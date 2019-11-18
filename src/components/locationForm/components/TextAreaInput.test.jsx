import React from 'react';
import { render } from '@testing-library/react';
import { withTheme } from 'test/utils';

import TextAreaInput from './TextAreaInput';

describe('TextAreaInput', () => {
  it('renders correctly', () => {
    const { container } = render(
      withTheme(<TextAreaInput cols="40" rows="5" className="txtArea" />)
    );

    expect(
      container.querySelector('textarea[cols="40"][rows="5"].txtArea')
    ).toBeTruthy();
  });
});
