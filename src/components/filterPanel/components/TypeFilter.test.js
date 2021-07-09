import { render, cleanup, fireEvent } from '@testing-library/react';
import { withTheme } from 'test/utils';
import { FilterContext } from 'shared/reducers/FilterContext';
import { initialState } from 'shared/reducers/filter';

import TypeFilter from './TypeFilter';

describe('TypeFilter', () => {
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
          <TypeFilter {...props} />
        </FilterContext.Provider>
      )
    );

    expect(queryByText('Blackspot')).toBeInTheDocument();
    expect(queryByText('Red route')).toBeInTheDocument();
    expect(queryByText('Protocol dodelijk ongeval')).toBeInTheDocument();
    expect(queryByText('Protocol ernstig ongeval')).toBeInTheDocument();
    expect(queryByText('Risico')).toBeInTheDocument();
  });

  it('should click one of the checkboxes', () => {
    const { container } = render(
      withTheme(
        <FilterContext.Provider
          value={{ state: { filter: initialState.filter } }}
        >
          <TypeFilter {...props} />
        </FilterContext.Provider>
      )
    );

    // click Centrum
    fireEvent.click(container.querySelector('label:nth-child(2)'));

    const { filter } = initialState;
    expect(props.updateFilters).toHaveBeenLastCalledWith(
      { ...filter.spotTypeFilter, blackspot: true },
      filter.spotStatusTypeFilter,
      filter.blackspotYearFilter,
      filter.deliveredYearFilter,
      filter.quickscanYearFilter,
      filter.stadsdeelFilter
    );
  });
});
