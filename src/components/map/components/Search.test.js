import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';
import { withTheme } from 'test/utils';
import { useMapInstance } from '@amsterdam/react-maps';
import { mocked } from 'ts-jest';
import useDataFetching from 'shared/hooks/useDataFetching';

import Search from './Search';

jest.mock('@amsterdam/react-maps');
jest.mock('shared/hooks/useDataFetching');
jest.mock('shared/api/api', () => {
  return {
    __esModule: true,
    getByUri: jest.fn(() => ({
      response: { docs: [{ centroide_ll: 'POINT(4.93194161 52.36328065)' }] },
    })),
  };
});

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

  it('should render correctly by default', () => {
    const { container } = render(withTheme(<Search />));

    expect(container.querySelectorAll('input').length).toBe(1);
    expect(container.querySelectorAll('ul').length).toBe(0);
  });

  it('should remove autosuggests when input field is blurred', async () => {
    jest.useFakeTimers();

    const { container } = render(withTheme(<Search />));

    const inputEl = container.querySelector('input');
    fireEvent.change(inputEl, { target: { value: 'Javastraat' } });

    expect(container.querySelectorAll('li').length).toBe(2);

    fireEvent.blur(inputEl);
    jest.runAllTimers();

    expect(container.querySelectorAll('li').length).toBe(0);
    jest.useRealTimers();
  });

  it('enter search term and click on autosuggest item', async () => {
    const { container } = render(withTheme(<Search />));

    const inputEl = container.querySelector('input');
    fireEvent.change(inputEl, { target: { value: 'Javastraat' } });

    expect(fetchDataSpy).toHaveBeenCalledWith(
      'https://geodata.nationaalgeoregister.nl/locatieserver/v3/suggest?fq=gemeentenaam:amsterdam&fq=type:adres&fl=id,weergavenaam,type,score,lat,lon&q=Javastraat'
    );
    expect(container.querySelectorAll('li').length).toBe(2);

    const anchorEl = container.querySelector('a:first-child');
    await act(async () => {
      fireEvent.click(anchorEl, { preventDefault: jest.fn() });
    });

    expect(flyToSpy).toHaveBeenCalledWith(
      { lat: 52.36328065, lng: 4.93194161 },
      11
    );
  });
});
