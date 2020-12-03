/* 
solution from  Tim and Jon

import { BaseLayer, Map } from '@amsterdam/arm-core';
function BlackSpotsLayer() {
  useBlackspotsLayer();
  return null;
}
function MyMap() {
  return <Map><BlackSpotsLayer/></Map>
} */

import React, { useState, useEffect, useCallback } from 'react';
import L from 'leaflet';

import {
  Map as ArmMap,
  BaseLayer,
  ViewerContainer,
  Zoom,
} from '@amsterdam/arm-core';

import Loader from 'shared/loader/Loader';
import { SpotTypes, SpotStatusTypes, Stadsdeel } from 'config';
import useAppReducer from 'shared/hooks/useAppReducer';
import { REDUCER_KEY as LOCATION } from 'shared/reducers/location';
import MapStyle from './MapStyle';
import DetailPanel from '../detailPanel/DetailPanel';
import FilterPanel from '../filterPanel/FilterPanel';
import { evaluateMarkerVisibility } from './helpers';
import './markerStyle.css';
import useDataFetching from '../../shared/hooks/useDataFetching';
import useYearFilters from './hooks/useYearFilters';
import useBlackspotsLayer from './hooks/useBlackspotsLayer';
// import useMap from './hooks/useMap';
// import getCrsRd from '../../shared/services/getCrsRd';
import { endpoints } from '../../config';
import useMarkerLayer from './hooks/useMarkerLayer';

const MAP_OPTIONS = {
  zoom: 10,
  maxZoom: 21,
  minZoom: 12,
  zoomControl: false,
  attributionControl: true,
  // crs: getCrsRd(),
  maxBounds: [
    [52.25168, 4.64034],
    [52.50536, 5.10737],
  ],
};

const Map = () => {
  const { /* errorMessage, */ loading, results, fetchData } = useDataFetching();
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [{ selectedLocation, locations }, actions] = useAppReducer(LOCATION);
  const [mapInstance, setMapInstance] = useState(undefined);

  useEffect(() => {
    if (locations.length === 0)
      (async () => {
        fetchData(`${endpoints.blackspots}?format=geojson`);
      })();
    // Keep the dependency array empty to prevent an infinite loop
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // const mapRef = useMap();
  // useEffect(() => {
  //   console.log('useEffect mapInstance', mapInstance);
  //   if (mapInstance) {
  //     L.tileLayer
  //       .wms('https://map.data.amsterdam.nl/maps/gebieden?', {
  //         layers: ['stadsdeel'],
  //         transparent: true,
  //         format: 'image/png',
  //       })
  //       .addTo(mapInstance);
  //   }
  // }, [mapInstance]);

  useEffect(() => {
    console.log('results', results);
    if (locations.length === 0)
      actions.addLocations({ payload: results ? [...results.features] : [] });
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
      actions.selectLocation({ payload: feature });
    },
    [actions]
  );

  const geoLayerRef = useBlackspotsLayer(mapInstance, locations, onMarkerClick);
  const { setLocation, layerRef } = useMarkerLayer(mapInstance);

  // const geoLayerRef = { current: { getLayers: () => [] } };
  // const setLocation = () => {};
  // const layerRef = { current: { getLayers: () => [] } };

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
    evaluateMarkerVisibility(
      [...geoLayerRef.current.getLayers()],
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
        [layerRef.current],
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
      <ArmMap
        data-testid="map"
        setInstance={instance => setMapInstance(instance)}
        options={MAP_OPTIONS}
        events={{
          click: e => {
            console.log('onMapClick', e);
          },
        }}
      >
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
    </MapStyle>
  );
};
export default Map;

/*

<div>
{loading && <Loader />}
{!errorMessage && !loading && (
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
)}

</div>

*/
