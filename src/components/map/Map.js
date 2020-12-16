import React, { useState, useEffect, useCallback, useContext } from 'react';

import {
  Map,
  BaseLayer,
  ViewerContainer,
  Zoom,
  getCrsRd,
} from '@amsterdam/arm-core';
import 'leaflet/dist/leaflet.css';
import Loader from 'shared/loader/Loader';
import { SpotTypes, SpotStatusTypes, Stadsdeel } from 'config';
// import useAppReducer from 'shared/hooks/useAppReducer';
// import { REDUCER_KEY as LOCATION } from 'shared/reducers/location';
// import { FilterBoxStyle } from '@amsterdam/asc-ui/lib/components/FilterBox';
import { actions } from 'shared/reducers/filter';
import { FilterContext } from 'shared/reducers/FilterContext';
// import { SELECT_LOCATION } from 'shared/reducers/location';
import MapStyle from './MapStyle';
import DetailPanel from '../detailPanel/DetailPanel';
import FilterPanel from '../filterPanel/FilterPanel';
import { evaluateMarkerVisibility } from './helpers';
import './markerStyle.css';
import useDataFetching from '../../shared/hooks/useDataFetching';
import useYearFilters from './hooks/useYearFilters';
import BlackspotsLayer from './hooks/useBlackspotsLayer';
import StadsdelenLayer from './components/StadsdelenLayer';
import { endpoints } from '../../config';
import { MarkerLayer } from './hooks/useMarkerLayer';

const MAP_OPTIONS = {
  center: [52.36988741057662, 4.8966407775878915],
  zoom: 9,
  maxZoom: 16,
  minZoom: 1, // ,8
  zoomControl: false,
  attributionControl: true,
  crs: getCrsRd(),
};

const MapComponent = () => {
  const {
    state: { locations, selectedLocation },
    dispatch,
  } = useContext(FilterContext);
  const { /* errorMessage, */ loading, results, fetchData } = useDataFetching();
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  // const [{ selectedLocation, locations }] = useAppReducer(LOCATION);
  const [mapInstance, setMapInstance] = useState(undefined);

  useEffect(() => {
    if (locations.length === 0)
      (async () => {
        fetchData(`${endpoints.blackspots}?format=geojson`);
      })();
    // Keep the dependency array empty to prevent an infinite loop
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (mapInstance) {
      console.log('mapInstance', mapInstance);
    }
  }, [mapInstance]);

  useEffect(() => {
    if (results) {
      console.log('results', results);
      dispatch(actions.setLocations(results ? [...results.features] : []));
    }
    // Keep the actions and locations out from the dependency array to prevent infinite loop
  }, [results, dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

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
      console.log('onMarkerClick', feature);
      dispatch(actions.selectLocation(feature));
    },
    [dispatch]
  );

  // const geoLayerRef = useBlackspotsLayer(mapInstance, locations, onMarkerClick);
  // const { setLocation, layerRef } = useMarkerLayer(mapInstance);

  // const geoLayerRef = { current: { getLayers: () => [] } };
  // const setLocation = () => {};
  // const layerRef = { current: { getLayers: () => [] } };

  useEffect(() => {
    if (selectedLocation) {
      setShowDetailPanel(true);
    }
  }, [selectedLocation]);

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
  // quickscan === protocol;
  const [quickscanListFilter, setQuickscanListFilter] = useState(false);

  // A filter that only shows spots that have the status DELIVERED
  const [deliveredListFilter, setDeliveredListFilter] = useState(false);

  useEffect(() => {
    if (!mapInstance) {
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
    // if (layerRef.current) {
    //   evaluateMarkerVisibility(
    //     [],
    //     spotTypeFilter,
    //     spotStatusTypeFilter,
    //     blackspotYearFilter,
    //     deliveredYearFilter,
    //     quickscanYearFilter,
    //     blackspotListFilter,
    //     quickscanListFilter,
    //     deliveredListFilter,
    //     stadsdeelFilter
    //   );
    // }
  }, [
    mapInstance,
    [],
    [],
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
    const filter = {
      spotTypeFilter: spotTypeFilterValue,
      spotStatusTypeFilter: spotStatusTypeFilterValue,
      blackspotYearFilter: blackspotYearFilterValue,
      deliveredYearFilter: deliveredYearFilterValue,
      quickscanYearFilter: quickscanYearFilterValue,
      stadsdeelFilter: stadsdeelFilterValue,
    };
    dispatch(actions.setFilter(filter));

    setSpotTypeFilter(spotTypeFilterValue);
    setSpotStatusTypeFilter(spotStatusTypeFilterValue);
    setBlackspotYearFilter(blackspotYearFilterValue);
    setDeliveredYearFilter(deliveredYearFilterValue);
    setQuickscanYearFilter(quickscanYearFilterValue);
    setStadsdeelFilter(stadsdeelFilterValue);
  };

  return (
    <MapStyle>
      <Map
        data-testid="map"
        fullScreen
        setInstance={instance => setMapInstance(instance)}
        options={MAP_OPTIONS}
      >
        <StadsdelenLayer />
        <BlackspotsLayer onMarkerClick={onMarkerClick} />
        <MarkerLayer />
        <ViewerContainer
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
          bottomRight={<Zoom />}
          topRight={loading && <Loader />}
        />
        <BaseLayer />
      </Map>
      <DetailPanel
        feature={selectedLocation}
        isOpen={showDetailPanel}
        togglePanel={toggleDetailPanel}
      />
    </MapStyle>
  );
};

export default MapComponent;
