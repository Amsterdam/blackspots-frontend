import React from 'react';
import { shallow } from 'enzyme';

import FilterPanel from './FilterPanel';

describe('Filter Panel', () => {
  const props = {
    spotTypeFilter: {},
    spotStatusTypeFilter: {},
    blackspotYearFilter: {},
    deliveredYearFilter: {},
    quickscanYearFilter: {},
    setFilters: () => {},
    setBlackspotListFilter: () => {},
    setQuickscanListFilter: () => {},
    setDeliveredListFilter: () => {},
  };
  it('should render without errors', () => {
    shallow(<FilterPanel {...props} />);
  });
});
