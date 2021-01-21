import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { withTheme } from 'test/utils';
import { FilterContext } from 'shared/reducers/FilterContext';
import { initialState } from 'shared/reducers/filter';

import FilterPanel from './FilterPanel';

describe('FilterPanel', () => {
  afterEach(cleanup);

  it('should render correctly', () => {
    const { queryByText, debug } = render(
      withTheme(
        <FilterContext.Provider
          value={{ state: { filter: initialState.filter } }}
        >
          <FilterPanel />
        </FilterContext.Provider>
      )
    );

    debug();

    expect(queryByText('Filters')).toBeInTheDocument();
    expect(queryByText('Stadsdeel')).toBeInTheDocument();
    // expect(queryByText('Noord')).toBeInTheDocument();
    // expect(queryByText('Oost')).toBeInTheDocument();
    // expect(queryByText('Centrum')).toBeInTheDocument();
    // expect(queryByText('West')).toBeInTheDocument();
    // expect(queryByText('Westpoort')).toBeInTheDocument();
    // expect(queryByText('Zuid')).toBeInTheDocument();
    // expect(queryByText('Zuidoost')).toBeInTheDocument();
  });
});
