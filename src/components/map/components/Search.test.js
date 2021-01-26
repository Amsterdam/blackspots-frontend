import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { withTheme } from 'test/utils';
import { useMapInstance } from '@amsterdam/react-maps';
import { mocked } from 'ts-jest';
import useDataFetching from 'shared/hooks/useDataFetching';

import Search from './Search';

jest.mock('@amsterdam/react-maps');
jest.mock('shared/hooks/useDataFetching');

const mockedUseMapInstance = mocked(useMapInstance);
const mockedDataFetching = mocked(useDataFetching);

describe('Search', () => {
  const flyToSpy = jest.fn();
  const fetchDataSpy = jest.fn();

  beforeEach(() => {
    mockedUseMapInstance.mockImplementation(() => ({
      flyTo: flyToSpy,
    }));

    mockedDataFetching.mockImplementation(() => ({
      results: {
        response: {
          docs: [
            { id: '1', weergavenaam: 'Javastraat 1-H, 1094GX Amsterdam' },
            { id: '2', weergavenaam: 'Javastraat 3-H, 1094GX Amsterdam' },
          ],
        },
      },
      fetchData: fetchDataSpy,
    }));
  });

  afterEach(cleanup);

  it('enter search term and click on autosuggest item', () => {
    const { container, debug } = render(withTheme(<Search />));

    const inputEl = container.querySelector('input');
    fireEvent.change(inputEl, { target: { value: 'Javastraat' } });

    expect(fetchDataSpy).toHaveBeenCalledTimes(1);
    expect(fetchDataSpy).toHaveBeenCalledWith(
      'https://geodata.nationaalgeoregister.nl/locatieserver/v3/suggest?fq=gemeentenaam:amsterdam&fq=type:adres&fl=id,weergavenaam,type,score,lat,lon&q=Javastraat'
    );
    expect(container.querySelectorAll('li').length).toBe(2);

    // debug();

    const anchorEl = container.querySelector('a:first-child');
    fireEvent.click(anchorEl, { preventDefault: jest.fn() });

    // expect(flyToSpy).toHaveBeenCalled();
    console.log('111');
  });
});
