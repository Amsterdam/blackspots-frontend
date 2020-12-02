import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import L from 'leaflet';
import { useMapInstance } from '@amsterdam/react-maps';
import { SpotTypes, SpotStatusTypes } from 'config';
import SVGIcon from '../../SVGIcon/SVGIcon';

export const handleFeature = (feature, layer, onClick) => {
  layer.on('click', ({ latlng }) => {
    onClick(feature, latlng);
  });
};

const createFeatureIcon = feature => {
  // Leaflet only accepts HTML elements for custom markers so we need to
  // create one from the SVGIcon
  const { status, spot_type: spotType } = feature.properties;
  const iconDiv = document.createElement('div');
  ReactDOM.render(<SVGIcon type={spotType} status={status} />, iconDiv);
  return {
    // Add the correct classname based on type
    // Risico types have a bigger icon therefore need more margin
    className: `marker-div-icon ${
      spotType === SpotTypes.RISICO ? 'large' : ''
    } ${status === SpotStatusTypes.GEEN_MAATREGEL ? 'extra-opacity' : ''}`,
    html: iconDiv,
  };
};

export const createFeature = (feature, latlng) => {
  // Create a marker with the correct icon and onClick method
  return L.marker(latlng, {
    icon: L.divIcon(createFeatureIcon(feature)),
  });
};

const useBlackspotsLayer = (unused, locations, onMarkerClick) => {
  console.log('useBlackspotsLayer', unused);
  const mapInstance = useMapInstance();
  console.log('useBlackspotsLayer', mapInstance);
  const geoLayerRef = useRef(null);
  useEffect(() => {
    geoLayerRef.current = L.geoJSON(locations, {
      // Add custom markers
      onEachFeature(feature, layer) {
        handleFeature(feature, layer, onMarkerClick);
      },
      pointToLayer: createFeature,
    }).addTo(mapInstance);
  }, [mapInstance, locations, onMarkerClick]);

  return geoLayerRef;
};

export default useBlackspotsLayer;
