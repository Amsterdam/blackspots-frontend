import React, { useEffect, useContext, useState } from 'react';
import ReactDOM from 'react-dom';
import L, { map } from 'leaflet';
import { useMapInstance, GeoJSON } from '@amsterdam/react-maps';
import { SpotTypes, SpotStatusTypes } from 'config';
import { FilterContext } from 'shared/reducers/FilterContext';
// import MarkerIcon from 'leaflet/dist/images/marker-icon.png';
import { formVisibility } from 'components/locationForm/definitions/FormFields';
import SVGIcon from '../../SVGIcon/SVGIcon';
import { getGeoJson } from '../helpers';

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
      layer.on('click', e => {
        e.originalEvent.stopPropagation();
        const latlng = {
          lat: feature.geometry.coordinates[1],
          lng: feature.geometry.coordinates[0],
        };

        const currentZoom = mapInstance.getZoom();
        mapInstance.flyTo(latlng, currentZoom < 11 ? 11 : currentZoom);
        onMarkerClick(feature);
      });
    },
  };

  useEffect(() => {
    if (mapInstance && locations.length) {
      setJson(getGeoJson(locations, filter));
    }
  }, [mapInstance, locations]);

  useEffect(() => {
    console.log('render filter');
    if (filter) {
      if (layerInstance) {
        layerInstance.clearLayers();
      }
      const data = getGeoJson(locations, filter);
      if (layerInstance) {
        layerInstance.addData(data);
      }
    }
  }, [filter]);

  return json ? (
    <GeoJSON setInstance={setLayerInstance} args={[json]} options={options} />
  ) : null;
};

export default BlackspotsLayer;
