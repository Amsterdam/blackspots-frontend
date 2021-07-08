import { render } from '@testing-library/react';
import { withTheme } from 'test/utils';

import TextAreaInput from './TextAreaInput';

describe('TextAreaInput', () => {
  const props = {
    name: 'text-name',
    value: 'text-value',
    label: 'text-label',
    onChange: jest.fn(),
  };

  it('renders correctly', () => {
    const { container } = render(
      withTheme(
        <TextAreaInput cols="40" rows="5" className="txtArea" {...props} />
      )
    );

    expect(
      container.querySelector('textarea[cols="40"][rows="5"].txtArea')
    ).toBeTruthy();
  });
});
