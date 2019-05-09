import React from 'react';
import { shallow } from 'enzyme';

import LandingPage from './LandingPage';

describe('LandingPage', () => {
  it('should render without errors', () => {
    shallow(<LandingPage />);
  });
});
