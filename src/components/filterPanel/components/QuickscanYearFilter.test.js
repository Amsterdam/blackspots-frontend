import { render, cleanup, fireEvent } from '@testing-library/react';
import { withTheme } from 'test/utils';
import { FilterContext } from 'shared/reducers/FilterContext';
import { initialState } from 'shared/reducers/filter';

import QuickscanYearFilter from './QuickscanYearFilter';

describe('QuickscanYearFilter', () => {
  const props = {
    updateFilters: jest.fn(),
    trackFilter: jest.fn(),
  };

  afterEach(cleanup);

  it('should render correctly', () => {
    const { queryByText } = render(
      withTheme(
        <FilterContext.Provider
          value={{ state: { filter: initialState.filter } }}
        >
          <QuickscanYearFilter {...props} />
        </FilterContext.Provider>
      )
    );
    expect(queryByText('2013')).toBeInTheDocument();
    expect(queryByText('2014')).toBeInTheDocument();
    expect(queryByText('2015')).toBeInTheDocument();
    expect(queryByText('2016')).toBeInTheDocument();
    expect(queryByText('2017')).toBeInTheDocument();
    expect(queryByText('2018')).toBeInTheDocument();
    expect(queryByText('2019')).toBeInTheDocument();
    expect(queryByText('2020')).toBeInTheDocument();
    expect(queryByText('2021')).toBeInTheDocument();
  });

  it('should click one of the checkboxes', () => {
    const { container } = render(
      withTheme(
        <FilterContext.Provider
          value={{ state: { filter: initialState.filter } }}
        >
          <QuickscanYearFilter {...props} />
        </FilterContext.Provider>
      )
    );

    // click 2019
    fireEvent.click(container.querySelector('label:nth-child(2)'));

    const { filter } = initialState;
    expect(props.updateFilters).toHaveBeenLastCalledWith(
      filter.spotTypeFilter,
      filter.spotStatusTypeFilter,
      filter.blackspotYearFilter,
      filter.deliveredYearFilter,
      { ...filter.quickscanYearFilter, 2020: true },
      filter.stadsdeelFilter
    );
  });
});
