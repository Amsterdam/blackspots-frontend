import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { withTheme } from 'test/utils';

import LandingPage from './LandingPage';

describe('LandingPage', () => {
  afterEach(cleanup);

  it('should render correctly', () => {
    const { queryByText } = render(withTheme(<LandingPage />));

    expect(queryByText('Werkgroep Blackspots')).toBeInTheDocument();
    expect(queryByText('Inloggen')).toBeInTheDocument();
  });
});
