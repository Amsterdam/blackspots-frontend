import React, { useState, useEffect } from 'react';

// Imports needed for amaps
import 'leaflet/dist/leaflet.css';
import 'amsterdam-amaps/dist/nlmaps/dist/assets/css/nlmaps.css';
import 'amsterdam-stijl/dist/css/ams-map.css';

import Loader from 'shared/loader/Loader';
import DetailPanel from '../detailPanel/DetailPanel';
import FilterPanel from '../filterPanel/FilterPanel';
import { evaluateMarkerVisibility } from './helpers';
import { SpotTypes, SpotStatusTypes } from 'constants.js';
import './markerStyle.css';
import useDataFetching from '../../shared/hooks/useDataFeatching';
import useYearFilters from './hooks/useYearFilters';
import useBlackspotsLayer from './hooks/useBlackspotsLayer';
import useMap from './hooks/useMap';
import MapStyle from './MapStyle';

import { shouldUseAccEnv } from 'helpers.js';

const Map = () => {
  const { errorMessage, loading, results, fetchData } = useDataFetching();
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);

  const mapRef = useMap();

  React.useEffect(() => {
    (async () => {
      const blackspotsEndpoint = `https://${
        shouldUseAccEnv() ? 'acc.' : ''
      }api.data.amsterdam.nl/blackspots/spots/?format=geojson`;
      fetchData(blackspotsEndpoint);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [
    blackspotYearFilter,
    deliveredYearFilter,
    quickscanYearFilter,
    setBlackspotYearFilter,
    setDeliveredYearFilter,
    setQuickscanYearFilter,
  ] = useYearFilters(results);

  const onMarkerClick = (feature, latlng) => {
    const currentZoom = mapRef.current.getZoom();
    mapRef.current.flyTo(latlng, currentZoom < 14 ? 14 : currentZoom);
    setSelectedFeature(feature);
    setShowDetailPanel(true);
  };

  const geoLayerRef = useBlackspotsLayer(mapRef, results, onMarkerClick);

  const toggleDetailPanel = () => {
    setShowDetailPanel(!showDetailPanel);
  };

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
      geoLayerRef.current.getLayers(),
      spotTypeFilter,
      spotStatusTypeFilter,
      blackspotYearFilter,
      deliveredYearFilter,
      quickscanYearFilter,
      blackspotListFilter,
      quickscanListFilter,
      deliveredListFilter
    );
  }, [
    geoLayerRef,
    spotTypeFilter,
    spotStatusTypeFilter,
    blackspotYearFilter,
    deliveredYearFilter,
    quickscanYearFilter,
    blackspotListFilter,
    quickscanListFilter,
    deliveredListFilter,
  ]);

  const setFilters = (
    spotTypeFilter,
    spotStatusTypeFilter,
    blackspotYearFilter,
    deliveredYearFilter,
    quickscanYearFilter
  ) => {
    setSpotTypeFilter(spotTypeFilter);
    setSpotStatusTypeFilter(spotStatusTypeFilter);
    setBlackspotYearFilter(blackspotYearFilter);
    setDeliveredYearFilter(deliveredYearFilter);
    setQuickscanYearFilter(quickscanYearFilter);
  };

  return (
    <MapStyle>
      <div id="mapdiv" style={{ height: '100%' }}>
        {loading && <Loader />}
        {!errorMessage && !loading && (
          <FilterPanel
            spotTypeFilter={spotTypeFilter}
            spotStatusTypeFilter={spotStatusTypeFilter}
            blackspotYearFilter={blackspotYearFilter}
            deliveredYearFilter={deliveredYearFilter}
            quickscanYearFilter={quickscanYearFilter}
            setFilters={setFilters}
            setBlackspotListFilter={value => setBlackspotListFilter(value)}
            setQuickscanListFilter={setQuickscanListFilter}
            setDeliveredListFilter={setDeliveredListFilter}
          />
        )}

        <DetailPanel
          feature={selectedFeature}
          isOpen={showDetailPanel}
          togglePanel={toggleDetailPanel}
        />
      </div>
    </MapStyle>
  );
};
export default Map;
