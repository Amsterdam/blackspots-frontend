import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { withTheme } from 'test/utils';

import App from './App';

describe('App', () => {
  afterEach(cleanup);

  it('should render correctly', () => {
    const { queryByTestId } = render(withTheme(<App />));

    expect(queryByTestId('app')).toBeInTheDocument();
  });
});
