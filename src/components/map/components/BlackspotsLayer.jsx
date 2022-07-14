import { useEffect, useContext, useState } from 'react';
import { renderToString } from 'react-dom/server';
import PropTypes from 'prop-types';
import L from 'leaflet';
import { useMapInstance, GeoJSON } from '@amsterdam/arm-core';
import { SpotTypes, SpotStatusTypes, SpotStatusColor } from 'config';
import { FilterContext } from 'shared/reducers/FilterContext';
import SVGIcon from '../../SVGIcon/SVGIcon';
import { getGeoJson } from '../helpers';
import { GeometryTypes } from 'config';

const createFeatureIcon = (feature) => {
  // Leaflet only accepts HTML elements for custom markers so we need to
  // create one from the SVGIcon
  const { status, spot_type: spotType } = feature.properties;

  return {
    // Add the correct classname based on type
    // Risico types have a bigger icon therefore need more margin
    className: `marker-div-icon ${
      spotType === SpotTypes.RISICO ? 'large' : ''
    } ${status === SpotStatusTypes.GEEN_MAATREGEL ? 'extra-opacity' : ''}`,
    html: renderToString(<SVGIcon type={spotType} status={status} />),
  };
};

const BlackspotsLayer = ({ onMarkerClick }) => {
  const {
    state: { locations, filter },
  } = useContext(FilterContext);
  const [json, setJson] = useState('');
  const mapInstance = useMapInstance();
  const [layerInstance, setLayerInstance] = useState('');

  const options = {
    pointToLayer(feature, latlng) {
      return L.marker(latlng, {
        icon: L.divIcon(createFeatureIcon(feature)),
      });
    },
    onEachFeature: (feature, layer) => {
      layer.on('click', (e) => {
        e.originalEvent.stopPropagation();
        const { geometry } = feature;

        const latlng =
          geometry.type === GeometryTypes.POINT
            ? {
                lat: geometry.coordinates[1],
                lng: geometry.coordinates[0],
              }
            : {
                lat: geometry.coordinates[0][0][1],
                lng: geometry.coordinates[0][0][0],
              };

        const currentZoom = mapInstance.getZoom();
        onMarkerClick(feature);
        if (currentZoom < 13) mapInstance.flyTo(latlng, 13);
      });
    },
    style: (feature) => {
      return {
        fill: true,
        color: SpotStatusColor[feature.properties.status],
        fillColor: SpotStatusColor[feature.properties.status],
      };
    },
  };

  useEffect(() => {
    if (mapInstance && locations.length) {
      const geoJson = getGeoJson(locations, filter);
      setJson(geoJson);
    }
  }, [mapInstance, locations, filter]);

  useEffect(() => {
    if (filter) {
      if (layerInstance) {
        layerInstance.clearLayers();
      }
      const data = getGeoJson(locations, filter);
      if (layerInstance) {
        layerInstance.addData(data);
      }
    }
  }, [filter, layerInstance, locations]);

  return json ? (
    <GeoJSON setInstance={setLayerInstance} args={[json]} options={options} />
  ) : null;
};

BlackspotsLayer.propTypes = {
  onMarkerClick: PropTypes.func.isRequired,
};

export default BlackspotsLayer;
