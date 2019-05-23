import React from 'react';
import { shallow } from 'enzyme';

import SelectMenu from './SelectMenu';

describe('SelectMenu', () => {
  it('should render without errors', () => {
    shallow(<SelectMenu items={[{ label: 'test', onClick: () => {} }]} />);
  });
});
