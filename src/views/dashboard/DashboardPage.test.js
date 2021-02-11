import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { withTheme } from 'test/utils';

import DashboardPage from './DashboardPage';

jest.mock('components/map/Map', () => 'BlackspotsKaart');

describe('DashboardPage', () => {
  afterEach(cleanup);

  it('should render correctly', () => {
    const { queryByTestId } = render(withTheme(<DashboardPage />));

    expect(queryByTestId('dashboard')).toBeInTheDocument();
  });
});
