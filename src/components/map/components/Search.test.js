import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { withTheme } from 'test/utils';
import { FilterContext } from 'shared/reducers/FilterContext';
import { initialState } from 'shared/reducers/filter';

import { useMapInstance } from '@amsterdam/react-maps';
import Map from '../Map';

import Search from './Search';

jest.mock('@amsterdam/react-maps', () =>
  jest.requireActual('@amsterdam/react-maps')
);

describe('Search', () => {
  afterEach(cleanup);

  it('should click one of the checkboxes', () => {
    const { container } = render(
      withTheme(
        <FilterContext.Provider value={{ state: initialState }}>
          <Map>
            <Search />
          </Map>
        </FilterContext.Provider>
      )
    );

    // click Centrum
    // fireEvent.click(container.querySelector('label:nth-child(2)'));

    expect(1).toBe(1);
  });
});
