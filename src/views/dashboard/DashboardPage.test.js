import React from 'react';
import { shallow } from 'enzyme';

import DashboardPage from './DashboardPage';

describe('DashboardPage', () => {
  it('should render without errors', () => {
    shallow(<DashboardPage />);
  });
});
