import { renderHook } from '@testing-library/react-hooks';
import amaps from 'amsterdam-amaps/dist/amaps';
import useMap from './useMap';

jest.mock('amsterdam-amaps/dist/amaps');

describe('useMap', () => {
  it('should should return a reference to the map', () => {
    const mapMock = { map: 'the map object', addLayer: jest.fn(), options: {} };
    amaps.createMap.mockReturnValue(mapMock);

    const { result } = renderHook(() => useMap());
    const refResult = result.current;
    expect(refResult).not.toBeUndefined();
    expect(refResult.current).toEqual({
      ...mapMock,
      options: {
        minZoom: 12,
        maxZoom: 21,
      },
    });
  });
});
