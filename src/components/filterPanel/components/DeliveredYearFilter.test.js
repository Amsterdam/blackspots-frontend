import { render, cleanup, fireEvent, screen } from '@testing-library/react';
import { withTheme } from 'test/utils';
import { FilterContext } from 'shared/reducers/FilterContext';
import { initialState } from 'shared/reducers/filter';

import DeliveredYearFilter from './DeliveredYearFilter';

describe('DeliveredYearFilter', () => {
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
          <DeliveredYearFilter {...props} />
        </FilterContext.Provider>
      )
    );

    expect(queryByText('2015')).toBeInTheDocument();
    expect(queryByText('2016')).toBeInTheDocument();
    expect(queryByText('2017')).toBeInTheDocument();
    expect(queryByText('2018')).toBeInTheDocument();
    expect(queryByText('2019')).toBeInTheDocument();
    expect(queryByText('2020')).toBeInTheDocument();
    expect(queryByText('2021')).toBeInTheDocument();
  });

  it('should click one of the checkboxes', () => {
    render(
      withTheme(
        <FilterContext.Provider
          value={{ state: { filter: initialState.filter } }}
        >
          <DeliveredYearFilter {...props} />
        </FilterContext.Provider>
      )
    );

    // click 2020
    fireEvent.click(screen.getByTestId('2020'));

    const { filter } = initialState;
    expect(props.updateFilters).toHaveBeenLastCalledWith(
      filter.spotTypeFilter,
      filter.spotStatusTypeFilter,
      filter.blackspotYearFilter,
      { ...filter.deliveredYearFilter, 2020: true },
      filter.quickscanYearFilter,
      filter.stadsdeelFilter
    );
  });
});
