import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import useAppReducer from 'shared/hooks/useAppReducer';
import useMarkerLayer from './hooks/useMarkerLayer';
import useDataFetching from '../../shared/hooks/useDataFetching';
import useYearFilters from './hooks/useYearFilters';
import useBlackspotsLayer from './hooks/useBlackspotsLayer';
import useMap from './hooks/useMap';

import Map from './Map';

jest.mock('shared/hooks/useAppReducer');
jest.mock('./hooks/useMarkerLayer');
jest.mock('../../shared/hooks/useDataFetching');
jest.mock('./hooks/useYearFilters');
jest.mock('./hooks/useBlackspotsLayer');
jest.mock('./hooks/useMap');

describe('Map', () => {
  const useDataFetchingMock = {
    errorMessage: '',
    loading: false,
    results: { features: [] },
    fetchData: jest.fn(),
  };

  const useAppReduerMock = [
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
    setLocation: jest.fn(),
    layerRef: {
      current: null,
    },
  };

  const useBlackspotsLayerMock = {
    current: {
      getLayers: jest.fn(() => []),
    },
  };

  beforeAll(() => {
    useDataFetching.mockReturnValue(useDataFetchingMock);
    useAppReducer.mockReturnValue(useAppReduerMock);
    useMarkerLayer.mockReturnValue(useMarkerLayerMock);
    useBlackspotsLayer.mockReturnValue(useBlackspotsLayerMock);
    useYearFilters.mockReturnValue(useYearFiltersMock);
    useMap.mockReturnValue({ current: {} });
  });
  it('should render correctly', () => {
    const { container, debug, getByText, queryByTestId } = render(<Map />);

    // debug();

    // Renders the FilterPanel
    expect(queryByTestId('filter-panel')).toBeInTheDocument();
    expect(
      container.querySelector('.FilterPanelCollapsed')
    ).not.toBeInTheDocument();

    expect(queryByTestId('detail-panel')).not.toBeInTheDocument();
  });
});
