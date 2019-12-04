import React from 'react';
import { shallow } from 'enzyme';

import ErrorMsg from './ErrorMsg';

describe('ErrorMsg', () => {
  it('should render without errors', () => {
    shallow(<ErrorMsg isOpen />);
  });
});
