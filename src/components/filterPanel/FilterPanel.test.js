import { render, cleanup } from '@testing-library/react';
import { withTheme } from 'test/utils';
import { FilterContext } from 'shared/reducers/FilterContext';
import { initialState } from 'shared/reducers/filter';

import FilterPanel from './FilterPanel';

describe('FilterPanel', () => {
  afterEach(cleanup);

  it('should render ALL', () => {
    const { queryByText } = render(
      withTheme(
        <FilterContext.Provider
          value={{ state: { filter: initialState.filter } }}
        >
          <FilterPanel />
        </FilterContext.Provider>
      )
    );

    expect(queryByText('Filters')).toBeInTheDocument();
    expect(queryByText('Type')).toBeInTheDocument();
    expect(queryByText('Status')).toBeInTheDocument();
    expect(queryByText('Stadsdeel')).toBeInTheDocument();
  });

  it('should render DELIVERED', () => {
    const { queryByText } = render(
      withTheme(
        <FilterContext.Provider
          value={{
            state: { filter: { ...initialState.filter, show: 'DELIVERED' } },
          }}
        >
          <FilterPanel />
        </FilterContext.Provider>
      )
    );

    expect(queryByText('Filters')).toBeInTheDocument();
    expect(queryByText('Type')).toBeInTheDocument();
    expect(queryByText('Status')).not.toBeInTheDocument();
    expect(queryByText('Stadsdeel')).toBeInTheDocument();
  });

  it('should render BLACKSPOTS', () => {
    const { queryByText } = render(
      withTheme(
        <FilterContext.Provider
          value={{
            state: { filter: { ...initialState.filter, show: 'BLACKSPOTS' } },
          }}
        >
          <FilterPanel />
        </FilterContext.Provider>
      )
    );

    expect(queryByText('Filters')).toBeInTheDocument();
    expect(queryByText('Type')).not.toBeInTheDocument();
    expect(queryByText('Status')).toBeInTheDocument();
    expect(queryByText('Stadsdeel')).toBeInTheDocument();
  });

  it('should render QUICKSCANS', () => {
    const { queryByText } = render(
      withTheme(
        <FilterContext.Provider
          value={{
            state: { filter: { ...initialState.filter, show: 'QUICKSCANS' } },
          }}
        >
          <FilterPanel />
        </FilterContext.Provider>
      )
    );

    expect(queryByText('Filters')).toBeInTheDocument();
    expect(queryByText('Type')).not.toBeInTheDocument();
    expect(queryByText('Status')).toBeInTheDocument();
    expect(queryByText('Stadsdeel')).toBeInTheDocument();
  });
});
