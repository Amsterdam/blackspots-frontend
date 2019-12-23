import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import useAppReducer from 'shared/hooks/useAppReducer';
import useDataFetching from 'shared/hooks/useDataFetching';
import { featureMock } from 'components/locationForm/LocationForm.mock';
import useMarkerLayer from './hooks/useMarkerLayer';
import useYearFilters from './hooks/useYearFilters';
import useBlackspotsLayer from './hooks/useBlackspotsLayer';
import useMap from './hooks/useMap';

import { evaluateMarkerVisibility } from './helpers';

import Map from './Map';

jest.mock('shared/hooks/useAppReducer');
jest.mock('./hooks/useMarkerLayer');
jest.mock('shared/hooks/useDataFetching');
jest.mock('./hooks/useYearFilters');
jest.mock('./hooks/useBlackspotsLayer');
jest.mock('./hooks/useMap');
jest.mock('./helpers');

describe('Map', () => {
  const useDataFetchingMock = {
    errorMessage: '',
    loading: false,
    results: { features: [] },
    fetchData: jest.fn(),
  };

  const useAppReducerMock = [
    {
      selectedLocation: null,
      locations: [],
    },
    {
      addLocations: jest.fn(),
      selectedLocation: jest.fn(),
    },
  ];

  const useYearFiltersMock = {
    blackspotYearFilter: {},
    deliveredYearFilter: {},
    quickscanYearFilter: {},
    setBlackspotYearFilter: jest.fn(),
    setDeliveredYearFilter: jest.fn(),
    setQuickscanYearFilter: jest.fn(),
  };

  const useMarkerLayerMock = {
    setLocation: () => {},
    layerRef: {
      current: null,
    },
  };

  const useBlackspotsLayerMock = {
    current: {
      getLayers: () => {
        return [];
      },
    },
  };

  beforeEach(() => {
    useDataFetching.mockReturnValue(useDataFetchingMock);
    useAppReducer.mockReturnValue(useAppReducerMock);
    useBlackspotsLayer.mockReturnValue(useBlackspotsLayerMock);
    useMarkerLayer.mockReturnValue(useMarkerLayerMock);
    useYearFilters.mockReturnValue(useYearFiltersMock);
    useMap.mockReturnValue({ current: {} });
  });

  afterEach(() => {
    jest.resetAllMocks();
    cleanup();
  });

  it('should render correctly', () => {
    const { container, queryByTestId } = render(<Map />);
    // Renders the FilterPanel
    expect(queryByTestId('filter-panel')).toBeInTheDocument();
    expect(
      container.querySelector('.FilterPanelCollapsed')
    ).not.toBeInTheDocument();

    // Doesn't render the DetailPanel
    expect(queryByTestId('detail-panel')).not.toBeInTheDocument();
    useBlackspotsLayer.mockReset();
  });

  it('should show the loading indicator when the data is loading', () => {
    const currentDataFetchingHook = { ...useDataFetchingMock, loading: true };
    useDataFetching.mockReturnValue(currentDataFetchingHook);
    const { queryByTestId } = render(<Map />);
    // Renders the de loader
    expect(queryByTestId('loader')).toBeInTheDocument();
    expect(queryByTestId('filter-panel')).not.toBeInTheDocument();
  });

  it('should add locations to the map when data is retrieved', () => {
    const resultMock = [{ id: 1 }];
    const currentDataFetchingHook = {
      ...useDataFetchingMock,
      results: { features: resultMock },
    };
    useDataFetching.mockReturnValueOnce(currentDataFetchingHook);
    evaluateMarkerVisibility.mockReturnValue(false);
    render(<Map />);
    expect(useAppReducerMock[1].addLocations).toHaveBeenCalledWith({
      payload: resultMock,
    });
    expect(evaluateMarkerVisibility).toHaveBeenCalledTimes(1);
  });

  it('should display the selected location', () => {
    const resultMock = [{ id: 1 }];
    const currentDataFetchingHook = {
      ...useDataFetchingMock,
      results: { features: resultMock },
    };
    useDataFetching.mockReturnValue(currentDataFetchingHook);
    evaluateMarkerVisibility.mockReturnValue(false);
    const currentAppReducerMock = [...useAppReducerMock];
    currentAppReducerMock[0] = {
      selectedLocation: featureMock,
      locations: [{ id: 1 }, { id: 2 }],
    };
    useAppReducer.mockReturnValue(currentAppReducerMock);
    useMarkerLayer.mockReturnValue({
      ...useMarkerLayerMock,
      layerRef: { current: { id: 1 } },
    });
    const { queryByTestId } = render(<Map />);

    // evaluates the visibility of the markers of the blackspors layer and the one of the marker layer
    expect(evaluateMarkerVisibility).toHaveBeenCalledTimes(2);

    // The DetailPanel is visible
    expect(queryByTestId('detail-panel')).toBeInTheDocument();
  });
});
