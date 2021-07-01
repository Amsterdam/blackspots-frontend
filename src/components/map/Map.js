/* eslint-disable react/jsx-curly-brace-presence */
import React, { useState, useEffect, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Map,
  BaseLayer,
  ViewerContainer,
  Zoom,
  Marker,
  getCrsRd,
} from '@amsterdam/arm-core';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Loader from 'shared/loader/Loader';
import { actions } from 'shared/reducers/filter';
import { FilterContext } from 'shared/reducers/FilterContext';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import DetailPanel from '../detailPanel/DetailPanel';
import FilterPanel from '../filterPanel/FilterPanel';
import './markerStyle.css';
import useDataFetching from '../../shared/hooks/useDataFetching';
import BlackspotsLayer from './components/BlackspotsLayer';
import StadsdelenLayer from './components/StadsdelenLayer';
import Search from './components/Search';
import { endpoints } from '../../config';

const MAP_OPTIONS = {
  center: [52.36988741057662, 4.8966407775878915],
  zoom: 9,
  maxZoom: 16,
  minZoom: 8,
  zoomControl: false,
  attributionControl: true,
  crs: getCrsRd(),
};

const MapComponent = ({ setShowError }) => {
  const {
    state: { selectedLocation, locations },
    dispatch,
  } = useContext(FilterContext);
  const { errorMessage, loading, results, fetchData } = useDataFetching();
  const [showDetailPanel, setShowDetailPanel] = useState(false);

  useEffect(() => {
    if (locations.length === 0)
      (async () => {
        fetchData(`${endpoints.blackspots}?format=geojson`);
      })();
    // Keep the dependency array empty to prevent an infinite loop
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (results) {
      dispatch(actions.setLocations(results ? [...results.features] : []));
    }
    // Keep the actions and locations out from the dependency array to prevent infinite loop
  }, [results, dispatch]);

  const onMarkerClick = useCallback(
    (feature) => {
      dispatch(actions.selectLocation(feature));
      setShowDetailPanel(true);
    },
    [dispatch, setShowDetailPanel]
  );

  useEffect(() => {
    if (errorMessage) {
      setShowError();
    }
  }, [errorMessage, setShowError]);

  const icon = L.icon({
    iconUrl: markerIcon,
    iconAnchor: [18, 45],
  });

  const toggleDetailPanel = useCallback(() => {
    setShowDetailPanel(!showDetailPanel);
  }, [showDetailPanel, setShowDetailPanel]);

  return (
    <>
      <Map data-testid="map" fullScreen options={MAP_OPTIONS}>
        <Marker
          options={{ icon, zIndexOffset: 1000 }}
          latLng={{
            lat: selectedLocation?.geometry?.coordinates[1] || 0,
            lng: selectedLocation?.geometry?.coordinates[0] || 0,
          }}
        />
        <StadsdelenLayer />
        <BlackspotsLayer onMarkerClick={onMarkerClick} />
        <ViewerContainer
          topLeft={<Search />}
          bottomLeft={<FilterPanel />}
          bottomRight={<Zoom />}
          topRight={loading && <Loader />}
        />
        <BaseLayer
          baseLayer={`https://{s}.data.amsterdam.nl/topo_rd_zw/{z}/{x}/{y}.png`}
        />
      </Map>
      <DetailPanel
        feature={selectedLocation}
        isOpen={showDetailPanel}
        togglePanel={toggleDetailPanel}
      />
    </>
  );
};

MapComponent.prototypes = {
  setShowError: PropTypes.func.isRequired,
};

export default MapComponent;
