import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { withTheme } from 'test/utils';
import { Map, getCrsRd } from '@amsterdam/arm-core';

import { useMapInstance } from '@amsterdam/react-maps';
import { FilterContext } from 'shared/reducers/FilterContext';
import { initialState } from 'shared/reducers/filter';
// import { mocked } from 'ts-jest';

import BlackspotsLayer from './BlackspotsLayer';

// jest.mock('@amsterdam/react-maps');

// const mockedUseMapInstance = mocked(useMapInstance);

describe('BlackspotsLayer', () => {
  const MAP_OPTIONS = {
    center: [52.36988741057662, 4.8966407775878915],
    zoom: 9,
    maxZoom: 16,
    minZoom: 8,
    zoomControl: false,
    attributionControl: true,
    crs: getCrsRd(),
  };
  const props = { onMarkerClick: jest.fn() };
  const mockedState = {
    ...initialState,
    locations: [
      {
        id: 104,
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [4.9039965, 52.377073],
        },
        properties: {
          stadsdeel: 'Centrum',
          documents: [],
          locatie_id: 'QD50_13',
          spot_type: 'protocol dodelijk',
          description: 'Ode Brug',
          wegvak: null,
          status: 'gereed',
          actiehouders: 'Uitgevoerd door het IB',
          start_uitvoering: 'Onbekend',
          eind_uitvoering: '01/09/16',
          tasks: '',
          notes: '',
          jaar_blackspotlijst: null,
          jaar_ongeval_quickscan: 2013,
          jaar_oplevering: 2016,
        },
      },
      {
        id: 78,
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [4.9035527, 52.382422],
        },
        properties: {
          stadsdeel: 'Noord',
          documents: [],
          locatie_id: 'BW7_18',
          spot_type: 'wegvak',
          description:
            'Buiksloterweg [nr. 265937] (1e wegvak t.o. Café de Pont)',
          wegvak: null,
          status: 'voorbereiding',
          actiehouders: 'IB',
          start_uitvoering: 'Onbekend',
          eind_uitvoering: 'Onbekend',
          tasks: '',
          notes: '',
          jaar_blackspotlijst: 2018,
          jaar_ongeval_quickscan: null,
          jaar_oplevering: null,
        },
      },
    ],
  };
  //   const flyToSpy = jest.fn();

  beforeEach(() => {
    // mockedUseMapInstance.mockImplementation(() => ({
    //   flyTo: flyToSpy,
    // }));
  });

  afterEach(cleanup);

  it('should render correctly', () => {
    const { debug, container } = render(
      withTheme(
        <FilterContext.Provider value={{ state: mockedState }}>
          <Map fullScreen options={MAP_OPTIONS}>
            <BlackspotsLayer {...props} />
          </Map>
        </FilterContext.Provider>
      )
    );
    debug();

    expect(container.querySelectorAll('.leaflet-marker-icon').length).toBe(2);
    // expect(flyToSpy).toHaveBeenCalledTimes(1);
  });
});
