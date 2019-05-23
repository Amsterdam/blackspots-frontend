import React from 'react';
import { shallow } from 'enzyme';

import DataTable from './DataTable';

describe('DataTable', () => {
  it('should render without errors', () => {
    shallow(<DataTable />);
  });
});
