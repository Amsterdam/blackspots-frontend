import React from 'react';
import { shallow } from 'enzyme';

import DetailPanel from './DetailPanel';

describe('Header', () => {
  it('should render without errors', () => {
    shallow(<DetailPanel isOpen={true} togglePanel={() => {}} />);
  });
});
