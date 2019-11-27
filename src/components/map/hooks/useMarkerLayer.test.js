import { renderHook, act } from '@testing-library/react-hooks';
import useMarkerLayer from './useMarkerLayer';
import { mockFeature } from 'components/locationForm/LocationForm.mock';
import { useState } from 'react';

describe('useMarkerLayer', () => {
  // const featureMock = mockFeature;
  const mapMock = {
    map: 'the map object',
    addLayer: jest.fn(),
    removeLayer: jest.fn(),
    getZoom: jest.fn(),
    flyTo: jest.fn(),
    options: {},
  };
  const latlng = { lat: 1, lng: 2 };

  it('should should return a reference to the layer', () => {
    const { result } = renderHook(() => useMarkerLayer({ current: mapMock }));

    const { layerRef, setLocation } = result.current;
    expect(layerRef.current).toBeNull();

    act(() => setLocation(latlng));

    expect(layerRef.current).not.toBeNull();
    expect(layerRef.current.options.icon.options).toEqual({
      iconAnchor: [18, 45],
      iconUrl: 'marker-icon.png',
    });

    expect(mapMock.getZoom).toHaveBeenCalledTimes(1);
    expect(mapMock.flyTo).toHaveBeenCalledTimes(1);
  });

  it('should recreate the layer when the location changes', () => {
    const { result } = renderHook(() => useMarkerLayer({ current: mapMock }));

    const { layerRef, setLocation } = result.current;
    act(() => setLocation(latlng));
    expect(layerRef.current).not.toBeNull();

    act(() => setLocation({ ...latlng, lng: 3 }));

    expect(mapMock.removeLayer).toHaveBeenCalledTimes(1);
  });

  it('should ignore the change when the location is null', () => {
    const { result } = renderHook(() => useMarkerLayer({ current: mapMock }));

    const { layerRef, setLocation } = result.current;
    act(() => setLocation(latlng));
    expect(layerRef.current).not.toBeNull();
    expect(mapMock.getZoom).toHaveBeenCalled();
    expect(mapMock.flyTo).toHaveBeenCalled();

    jest.resetAllMocks();
    act(() => setLocation(null));

    expect(mapMock.removeLayer).not.toHaveBeenCalled();
    expect(mapMock.getZoom).not.toHaveBeenCalled();
    expect(mapMock.flyTo).not.toHaveBeenCalled();
  });
});
