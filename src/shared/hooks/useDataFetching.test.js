import { renderHook, act } from '@testing-library/react';
import { getByUrl } from '../api/api';
import useDataFetching from './useDataFetching';

jest.mock('../api/api');

describe('useDataFetching', () => {
  const mockData = {
    data: 'mock-data',
  };

  beforeEach(() => {
    getByUrl.mockImplementation(() => Promise.resolve(mockData));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should create the hook', () => {
    const { result } = renderHook(() => useDataFetching());
    expect(result.current).not.toBeUndefined();
    expect(result.current.loading).toEqual(false);
    expect(result.current.errorMessage).toBeUndefined();
  });

  it('should fetch the data', async () => {
    const { result } = renderHook(() => useDataFetching());
    await act(async () => result.current.fetchData('http://test-url'));
    expect(result.current.errorMessage).toBeUndefined();
    expect(result.current.results).toEqual(mockData);
  });

  it('should return an error when data cannnot be fetched', async () => {
    const errorMessage = 'an unexpected error occured';
    getByUrl.mockImplementation(() => {
      throw Error(errorMessage);
    });

    const { result } = renderHook(() => useDataFetching());
    await act(async () => result.current.fetchData('http://test-url'));
    expect(result.current.results).toBeNull();
    expect(result.current.errorMessage).toEqual(errorMessage);
  });
});
