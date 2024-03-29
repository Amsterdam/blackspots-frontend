import { render, fireEvent, act } from '@testing-library/react';
import { withTheme } from 'test/utils';
import { flyToSpy } from '@amsterdam/arm-core';
import { fetchDataSpy } from 'shared/hooks/useDataFetching';
import Search from './Search';

jest.mock('@amsterdam/arm-core');
jest.mock('@amsterdam/arm-core', () => {
  const flyToSpy = jest.fn();

  return {
    __esModule: true,
    useMapInstance: () => ({
      flyTo: flyToSpy,
    }),
    flyToSpy,
    default: () => <></>,
  };
});
jest.mock('shared/api/api', () => {
  return {
    __esModule: true,
    getByUri: jest.fn(() => ({
      response: { docs: [{ centroide_ll: 'POINT(4.93194161 52.36328065)' }] },
    })),
  };
});

jest.mock('shared/hooks/useDataFetching', () => {
  const fetchData = jest.fn();

  return {
    __esModule: true,
    default: () => ({
      results: {
        response: {
          docs: [
            { id: '1', weergavenaam: 'Javastraat 1-H, 1094GX Amsterdam' },
            { id: '2', weergavenaam: 'Javastraat 3-H, 1094GX Amsterdam' },
          ],
        },
      },
      fetchData,
    }),
    fetchDataSpy: fetchData,
  };
});

describe('Search', () => {
  it('should render correctly by default', () => {
    const { container } = render(withTheme(<Search />));

    expect(container.querySelectorAll('input').length).toBe(1);
    expect(container.querySelectorAll('ul').length).toBe(0);
  });

  it('should remove autosuggests when input field is blurred', async () => {
    jest.useFakeTimers();

    const { container } = render(withTheme(<Search />));

    const inputEl = container.querySelector('input');
    act(() => {
      fireEvent.change(inputEl, { target: { value: 'Javastraat' } });
    });

    act(() => {
      jest.runAllTimers();
    });

    expect(container.querySelectorAll('li').length).toBe(2);

    act(() => {
      fireEvent.blur(inputEl);
    });
    act(() => {
      jest.runAllTimers();
    });

    expect(container.querySelectorAll('li').length).toBe(0);

    jest.useRealTimers();
  });

  it('enter search term and click on autosuggest item', async () => {
    jest.useFakeTimers();
    const { container } = render(withTheme(<Search />));

    const inputEl = container.querySelector('input');
    act(() => {
      fireEvent.change(inputEl, { target: { value: 'Javastraat' } });
    });
    act(() => {
      jest.runAllTimers();
    });

    expect(fetchDataSpy).toHaveBeenCalledWith(
      'https://geodata.nationaalgeoregister.nl/locatieserver/v3/suggest?fq=gemeentenaam:amsterdam&fq=type:adres&fl=id,weergavenaam,type,score,lat,lon&q=Javastraat'
    );
    expect(container.querySelectorAll('li').length).toBe(2);

    const anchorEl = container.querySelector('a:first-child');
    await act(async () => {
      fireEvent.click(anchorEl, { preventDefault: jest.fn() });
    });
    act(() => {
      jest.runAllTimers();
    });

    expect(flyToSpy).toHaveBeenCalledWith(
      { lat: 52.36328065, lng: 4.93194161 },
      11
    );

    jest.useRealTimers();
  });
});
