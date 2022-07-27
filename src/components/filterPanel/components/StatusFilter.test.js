import { render, cleanup, fireEvent } from '@testing-library/react';
import { withTheme } from 'test/utils';
import { FilterContext } from 'shared/reducers/FilterContext';
import { initialState } from 'shared/reducers/filter';

import StatusFilter from './StatusFilter';

describe('StatusFilter', () => {
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
          <StatusFilter {...props} />
        </FilterContext.Provider>
      )
    );

    expect(queryByText('In onderzoek')).toBeInTheDocument();
    expect(queryByText('In voorbereiding')).toBeInTheDocument();
    expect(queryByText('In uitvoering')).toBeInTheDocument();
    expect(queryByText('Gereed')).toBeInTheDocument();
    expect(queryByText('Geen maatregel')).toBeInTheDocument();
  });

  it('should click one of the checkboxes', () => {
    const { container } = render(
      withTheme(
        <FilterContext.Provider
          value={{ state: { filter: initialState.filter } }}
        >
          <StatusFilter {...props} />
        </FilterContext.Provider>
      )
    );

    // click Centrum
    fireEvent.click(container.querySelector('label:nth-child(2)'));

    const { filter } = initialState;
    expect(props.updateFilters).toHaveBeenLastCalledWith({
      ...filter.spotStatusTypeFilter,
      'onderzoek ontwerp': true,
    });
  });
});
