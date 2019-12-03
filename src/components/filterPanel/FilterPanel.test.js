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
    stadsdeelFilter: {},
    setFilters: () => {},
    setBlackspotListFilter: () => {},
    setQuickscanListFilter: () => {},
    setDeliveredListFilter: () => {},
    setStadsdeelFilter: () => {},
  };

  it('should render without errors', () => {
    shallow(<FilterPanel {...props} />);
  });
});
