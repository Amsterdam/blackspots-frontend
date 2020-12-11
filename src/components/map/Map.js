import React, { useState, useEffect, useCallback, useReducer } from 'react';
import { getCrsRd } from '@datapunt/amsterdam-react-maps/lib/utils';
// import L from 'leaflet';

import {
  Map as ArmMap,
  BaseLayer,
  ViewerContainer,
  Zoom,
} from '@amsterdam/arm-core';

import 'leaflet/dist/leaflet.css';
import Loader from 'shared/loader/Loader';
import { SpotTypes, SpotStatusTypes, Stadsdeel } from 'config';
import useAppReducer from 'shared/hooks/useAppReducer';
import { REDUCER_KEY as LOCATION } from 'shared/reducers/location';
// import { FilterBoxStyle } from '@amsterdam/asc-ui/lib/components/FilterBox';
import filterReducer, {
  initialState,
  SET_LOCATIONS,
  SELECT_LOCATION,
} from 'shared/reducers/filter';
import FilterContext from 'shared/reducers/FilterContext';
import MapStyle from './MapStyle';
import DetailPanel from '../detailPanel/DetailPanel';
import FilterPanel from '../filterPanel/FilterPanel';
import { evaluateMarkerVisibility } from './helpers';
import './markerStyle.css';
import useDataFetching from '../../shared/hooks/useDataFetching';
import useYearFilters from './hooks/useYearFilters';
import { BlackspotsLayer } from './hooks/useBlackspotsLayer';
import { endpoints } from '../../config';
import { MarkerLayer } from './hooks/useMarkerLayer';

const MAP_OPTIONS = {
  center: [52.36988741057662, 4.8966407775878915],
  zoom: 13,
  maxZoom: 21,
  minZoom: 12,
  zoomControl: false,
  attributionControl: true,
  crs: getCrsRd(),
};

const Map = () => {
  const [state, dispatch] = useReducer(filterReducer, initialState);

  const { /* errorMessage, */ loading, results, fetchData } = useDataFetching();
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [{ selectedLocation, locations }] = useAppReducer(LOCATION);
  const [mapInstance, setMapInstance] = useState(undefined);

  console.log('context test', state.test);
  useEffect(() => {
    if (locations.length === 0)
      (async () => {
        fetchData(`${endpoints.blackspots}?format=geojson`);
      })();
    // Keep the dependency array empty to prevent an infinite loop
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    console.log('mapInstance', mapInstance);
    if (mapInstance) {
      console.log('GET FROM GLOBAL ---------------------------------------');
      // setGeoLayerRef(global.geoLayerRef);
      // setlLayerRef(global.layerRef);
      // setSetLocation(global.setLocation);

      // setTimeout(() => {
      //   console.log(
      //     'settimeout GET FROM GLOBAL ===============================',
      //     global.setLocation
      //   );
      //   setGeoLayerRef(global.geoLayerRef);
      //   setlLayerRef(global.layerRef);
      //   setSetLocation(global.setLocation);
      // }, 10000);

      // Add the stadsdelen WMS
      // L.tileLayer
      //   .wms('https://map.data.amsterdam.nl/maps/gebieden?', {
      //     layers: ['stadsdeel'],
      //     transparent: true,
      //     format: 'image/png',
      //   })
      //   .addTo(mapInstance);
    }
  }, [mapInstance]);

  useEffect(() => {
    console.log('results', results);
    if (results) {
      dispatch({
        type: SET_LOCATIONS,
        payload: results ? [...results.features] : [],
      });
    }
    // Keep the actions and locations out from the dependency array to prevent infinite loop
  }, [results]); // eslint-disable-line react-hooks/exhaustive-deps

  const [
    blackspotYearFilter,
    deliveredYearFilter,
    quickscanYearFilter,
    setBlackspotYearFilter,
    setDeliveredYearFilter,
    setQuickscanYearFilter,
  ] = useYearFilters(locations);

  const onMarkerClick = useCallback(
    feature => {
      dispatch({ type: SELECT_LOCATION, payload: feature });
    },
    [dispatch]
  );

  // const geoLayerRef = useBlackspotsLayer(mapInstance, locations, onMarkerClick);
  // const { setLocation, layerRef } = useMarkerLayer(mapInstance);

  const geoLayerRef = { current: { getLayers: () => [] } };
  const setLocation = () => {};
  const layerRef = { current: { getLayers: () => [] } };

  useEffect(() => {
    if (selectedLocation) {
      setLocation(selectedLocation);

      setShowDetailPanel(true);
    }
  }, [selectedLocation, setLocation]);

  const toggleDetailPanel = useCallback(() => {
    setShowDetailPanel(!showDetailPanel);
  }, [showDetailPanel]);

  const [spotStatusTypeFilter, setSpotStatusTypeFilter] = useState({
    [SpotStatusTypes.ONDERZOEK]: false,
    [SpotStatusTypes.VOORBEREIDING]: false,
    [SpotStatusTypes.GEREED]: false,
    [SpotStatusTypes.GEEN_MAATREGEL]: false,
    [SpotStatusTypes.UITVOERING]: false,
    [SpotStatusTypes.ONBEKEND]: false,
  });
  const [spotTypeFilter, setSpotTypeFilter] = useState({
    [SpotTypes.BLACKSPOT]: false,
    [SpotTypes.PROTOCOL_DODELIJK]: false,
    [SpotTypes.PROTOCOL_ERNSTIG]: false,
    [SpotTypes.RISICO]: false,
    [SpotTypes.WEGVAK]: false,
  });
  const [stadsdeelFilter, setStadsdeelFilter] = useState({
    ...Object.values(Stadsdeel).reduce(
      (acc, item) => ({ ...acc, [item.name]: false }),
      {}
    ),
  });

  // A filter to only show items on the 'blackspot list', which are all
  // spots with type BLACKSPOT or WEGVAk
  const [blackspotListFilter, setBlackspotListFilter] = useState(false);

  // A filter to only show items on the 'protocol list', which are all spots
  // with type PROTOCOL_ERNSTIG or PROTOCOL_DODELIJK
  // Note: quickscan === protocol
  const [quickscanListFilter, setQuickscanListFilter] = useState(false);

  // A filter that only shows spots that have the status DELIVERED
  const [deliveredListFilter, setDeliveredListFilter] = useState(false);

  useEffect(() => {
    if (!mapInstance || !layerRef?.current || !geoLayerRef?.current) {
      return;
    }
    evaluateMarkerVisibility(
      [],
      spotTypeFilter,
      spotStatusTypeFilter,
      blackspotYearFilter,
      deliveredYearFilter,
      quickscanYearFilter,
      blackspotListFilter,
      quickscanListFilter,
      deliveredListFilter,
      stadsdeelFilter
    );
    if (layerRef.current) {
      evaluateMarkerVisibility(
        [],
        spotTypeFilter,
        spotStatusTypeFilter,
        blackspotYearFilter,
        deliveredYearFilter,
        quickscanYearFilter,
        blackspotListFilter,
        quickscanListFilter,
        deliveredListFilter,
        stadsdeelFilter
      );
    }
  }, [
    mapInstance,
    geoLayerRef,
    layerRef,
    spotTypeFilter,
    spotStatusTypeFilter,
    blackspotYearFilter,
    deliveredYearFilter,
    quickscanYearFilter,
    blackspotListFilter,
    quickscanListFilter,
    deliveredListFilter,
    stadsdeelFilter,
  ]);

  const setFilters = (
    spotTypeFilterValue,
    spotStatusTypeFilterValue,
    blackspotYearFilterValue,
    deliveredYearFilterValue,
    quickscanYearFilterValue,
    stadsdeelFilterValue
  ) => {
    setSpotTypeFilter(spotTypeFilterValue);
    setSpotStatusTypeFilter(spotStatusTypeFilterValue);
    setBlackspotYearFilter(blackspotYearFilterValue);
    setDeliveredYearFilter(deliveredYearFilterValue);
    setQuickscanYearFilter(quickscanYearFilterValue);
    setStadsdeelFilter(stadsdeelFilterValue);
  };

  return (
    <MapStyle>
      <FilterContext>
        <ArmMap
          data-testid="map"
          setInstance={instance => setMapInstance(instance)}
          options={MAP_OPTIONS}
          events={{
            click: e => {
              console.log('onMapClick', e, state.layerRef);
            },
          }}
        >
          <BlackspotsLayer
            locations={state.locations}
            onMarkerClick={onMarkerClick}
          />
          <MarkerLayer />
          <ViewerContainer
            bottomRight={<Zoom />}
            topRight={loading && <Loader />}
            bottomLeft={
              <FilterPanel
                spotTypeFilter={spotTypeFilter}
                spotStatusTypeFilter={spotStatusTypeFilter}
                blackspotYearFilter={blackspotYearFilter}
                deliveredYearFilter={deliveredYearFilter}
                quickscanYearFilter={quickscanYearFilter}
                stadsdeelFilter={stadsdeelFilter}
                setFilters={setFilters}
                setBlackspotListFilter={value => setBlackspotListFilter(value)}
                setQuickscanListFilter={setQuickscanListFilter}
                setDeliveredListFilter={setDeliveredListFilter}
                setStadsdeelFilter={setStadsdeelFilter}
              />
            }
          />
          <BaseLayer />
        </ArmMap>
        <DetailPanel
          feature={selectedLocation}
          isOpen={showDetailPanel}
          togglePanel={toggleDetailPanel}
        />
      </FilterContext>
    </MapStyle>
  );
};

export default Map;
