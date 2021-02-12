import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { withTheme } from 'test/utils';

import BlueLinkButton from './BlueLinkButton';

describe('BlueLinkButton', () => {
  afterEach(cleanup);

  it('should render correctly', () => {
    const props = {
      href: '',
      text: 'link ergens naartoe',
      external: true,
      chevronDirection: 'left',
    };
    const { queryByText } = render(withTheme(<BlueLinkButton {...props} />));

    expect(queryByText(props.text)).toBeInTheDocument();
  });
});
