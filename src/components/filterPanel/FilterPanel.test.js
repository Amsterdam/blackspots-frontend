import React from 'react';
import { shallow } from 'enzyme';

import FilterPanel from './FilterPanel';

describe('Filter Panel', () => {
  it('should render without errors', () => {
    shallow(<FilterPanel />);
  });
});
