import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { withTheme } from 'test/utils';

import ContentBox from './ContentBox';

describe('ContentBox', () => {
  afterEach(cleanup);

  it('should render correctly', () => {
    const { queryByText } = render(
      withTheme(<ContentBox>children</ContentBox>)
    );

    expect(queryByText('children')).toBeInTheDocument();
  });
});
