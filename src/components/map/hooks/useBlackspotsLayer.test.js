import { renderHook } from '@testing-library/react-hooks';
import amaps from 'amsterdam-amaps/dist/amaps';
import useBlackspotsLayer from './useBlackspotsLayer';

jest.mock('amsterdam-amaps/dist/amaps');

describe('createSpotIcon', () => {});

describe('useBlackspotsLayer', () => {
  const mapMock = { map: 'the map object', addLayer: jest.fn(), options: {} };
  const onMarkerClickMock = jest.fn();

  beforeEach(() => {
    amaps.createMap.mockReturnValue(mapMock);
  });

  it('should should return a reference to the layer', () => {
    const { result } = renderHook(() =>
      useBlackspotsLayer({ current: mapMock }, [], onMarkerClickMock)
    );

    const refResult = result.current.current;
    expect(refResult).not.toBeUndefined();
    expect(refResult.options).not.toBeUndefined();
    expect(refResult.options.onEachFeature).not.toBeUndefined();
    expect(refResult.options.pointToLayer).not.toBeUndefined();
  });
});
