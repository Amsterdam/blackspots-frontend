import React from 'react';
import { shallow } from 'enzyme';

import LocationPage from './LocationPage';

describe('LocationPage', () => {
  it('should render without errors', () => {
    shallow(<LocationPage match={{ params: {} }} />);
  });
});
