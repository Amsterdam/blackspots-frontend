import React from 'react';
import { shallow } from 'enzyme';

import ManageLocationPage from './ManageLocationPage';

describe('ManageLocationPage', () => {
  it('should render without errors', () => {
    shallow(<ManageLocationPage match={{ params: {} }} />);
  });
});
