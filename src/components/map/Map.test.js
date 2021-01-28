import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { withTheme } from 'test/utils';
import { FilterContext } from 'shared/reducers/FilterContext';
import { initialState } from 'shared/reducers/filter';

import Map from './Map';

describe('Map', () => {
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

  afterEach(cleanup);

  it('should render correctly', () => {
    const { container, queryByTestId } = render(
      withTheme(
        <FilterContext.Provider value={{ state: mockedState }}>
          <Map />
        </FilterContext.Provider>
      )
    );

    expect(queryByTestId('map')).toBeInTheDocument();

    // number of markers + 1
    expect(container.querySelectorAll('.leaflet-marker-icon').length).toBe(3);
  });

  it('should click one of the markers and dispatch SELECT_LOCATION', () => {
    const dispatchSpy = jest.fn();
    const { container } = render(
      withTheme(
        <FilterContext.Provider
          value={{ state: mockedState, dispatch: dispatchSpy }}
        >
          <Map />
        </FilterContext.Provider>
      )
    );

    // click marker
    fireEvent.click(container.querySelector('.leaflet-marker-icon:last-child'));

    expect(dispatchSpy).toHaveBeenCalledWith({
      type: 'filter/SELECT_LOCATION',
      payload: mockedState.locations[1],
    });
  });
});
