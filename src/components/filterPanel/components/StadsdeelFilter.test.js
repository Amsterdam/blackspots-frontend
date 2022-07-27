import { render, cleanup, fireEvent } from '@testing-library/react';
import { withTheme } from 'test/utils';
import { FilterContext } from 'shared/reducers/FilterContext';
import { initialState } from 'shared/reducers/filter';

import StadsdeelFilter from './StadsdeelFilter';

describe('StadsdeelFilter', () => {
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
          <StadsdeelFilter {...props} />
        </FilterContext.Provider>
      )
    );

    expect(queryByText('Centrum')).toBeInTheDocument();
    expect(queryByText('Nieuw West')).toBeInTheDocument();
    expect(queryByText('Noord')).toBeInTheDocument();
    expect(queryByText('Oost')).toBeInTheDocument();
    expect(queryByText('Centrum')).toBeInTheDocument();
    expect(queryByText('West')).toBeInTheDocument();
    expect(queryByText('Westpoort')).toBeInTheDocument();
    expect(queryByText('Zuid')).toBeInTheDocument();
    expect(queryByText('Zuidoost')).toBeInTheDocument();
  });

  it('should click one of the checkboxes', () => {
    const { container } = render(
      withTheme(
        <FilterContext.Provider
          value={{ state: { filter: initialState.filter } }}
        >
          <StadsdeelFilter {...props} />
        </FilterContext.Provider>
      )
    );

    // click Centrum
    fireEvent.click(container.querySelector('label:nth-child(2)'));

    const { filter } = initialState;
    expect(props.updateFilters).toHaveBeenLastCalledWith({
      ...filter.stadsdeelFilter,
      Centrum: true,
    });
  });
});
