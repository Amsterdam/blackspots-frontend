import { renderHook } from '@testing-library/react-hooks';
import amaps from 'amsterdam-amaps/dist/amaps';
import useBlackspotsLayer from './useBlackspotsLayer';
import { featureMock } from 'components/locationForm/LocationForm.mock';

jest.mock('amsterdam-amaps/dist/amaps');

describe('useBlackspotsLayer', () => {
  it('should should return a reference to the layer', () => {
    // const featureMock = mockFeature;
    const mapMock = { map: 'the map object', addLayer: jest.fn(), options: {} };
    const onMarkerClickMock = jest.fn();
    amaps.createMap.mockReturnValue(mapMock);

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
