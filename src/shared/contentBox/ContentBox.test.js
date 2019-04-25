import React from 'react';
import { shallow } from 'enzyme';

import ContentBox from './ContentBox';

describe('Content', () => {
  it('should render without errors', () => {
    shallow(<ContentBox />);
  });
});
