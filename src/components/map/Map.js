import React, { useState, useEffect, useCallback } from 'react';

import Loader from 'shared/loader/Loader';
import { SpotTypes, SpotStatusTypes, Stadsdeel } from 'config';
import useAppReducer from 'shared/hooks/useAppReducer';
import { REDUCER_KEY as LOCATION } from 'shared/reducers/location';
import DetailPanel from '../detailPanel/DetailPanel';
import FilterPanel from '../filterPanel/FilterPanel';
import { evaluateMarkerVisibility, createFilter } from './helpers';
import './markerStyle.css';
import MapStyle from './MapStyle';
import { endpoints } from '../../config';
import useDataFetching from '../../shared/hooks/useDataFetching';
import useYearFilters from './hooks/useYearFilters';
import useBlackspotsLayer from './hooks/useBlackspotsLayer';
import useMap from './hooks/useMap';
import useMarkerLayer from './hooks/useMarkerLayer';

const Map = () => {
  const mapId = 'mapdiv';
  const mapRef = useMap(mapId);
  const { errorMessage, loading, results, fetchData } = useDataFetching();
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [{ selectedLocation, locations }, actions] = useAppReducer(LOCATION);

  const {
    blackspotYearFilter,
    deliveredYearFilter,
    quickscanYearFilter,
    setBlackspotYearFilter,
    setDeliveredYearFilter,
    setQuickscanYearFilter,
  } = useYearFilters(locations);

  const onMarkerClick = useCallback(feature => {
    actions.selectLocation({ payload: feature });
  }, []);
  const geoLayerRef = useBlackspotsLayer(mapRef, locations, onMarkerClick);
  const { setLocation, layerRef } = useMarkerLayer(mapRef);

  useEffect(() => {
    if (locations.length === 0)
      (async () => {
        fetchData(`${endpoints.blackspots}?format=geojson`);
      })();
    // Keep the dependency array empty to prevent an infinite loop
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (locations.length === 0)
      actions.addLocations({ payload: results ? [...results.features] : [] });
    // Keep the actions and locations out from the dependency array to prevent infinite loop
  }, [results]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (selectedLocation) {
      setLocation(selectedLocation);

      setShowDetailPanel(true);
    }
  }, [selectedLocation, setLocation]);

  const toggleDetailPanel = useCallback(() => {
    setShowDetailPanel(!showDetailPanel);
  }, [showDetailPanel]);

  const [spotTypeFilter, setSpotTypeFilter] = useState({
    ...createFilter(SpotTypes),
  });
  const [spotStatusTypeFilter, setSpotStatusTypeFilter] = useState({
    ...createFilter(SpotStatusTypes),
  });
  const [stadsdeelFilter, setStadsdeelFilter] = useState({
    ...createFilter(Stadsdeel, 'name'),
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
      <div id={mapId}>
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
            setBlackspotListFilter={setBlackspotListFilter}
            setQuickscanListFilter={setQuickscanListFilter}
            setDeliveredListFilter={setDeliveredListFilter}
            setStadsdeelFilter={setStadsdeelFilter}
          />
        )}

        <DetailPanel
          feature={selectedLocation}
          isOpen={showDetailPanel}
          togglePanel={toggleDetailPanel}
        />
      </div>
    </MapStyle>
  );
};
export default Map;
