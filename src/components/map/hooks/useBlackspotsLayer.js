import React, { useEffect, useContext, useState } from 'react';
import ReactDOM from 'react-dom';
import L, { DomEvent } from 'leaflet';

import { useMapInstance, GeoJSON } from '@amsterdam/react-maps';
import { SpotTypes, SpotStatusTypes } from 'config';
import { FilterContext } from 'shared/reducers/FilterContext';
import SVGIcon from '../../SVGIcon/SVGIcon';

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
    state: { locations },
  } = useContext(FilterContext);
  const [json, setJson] = useState('');
  const mapInstance = useMapInstance();

  const options = {
    pointToLayer(feature, latlng) {
      return L.marker(latlng, {
        icon: L.divIcon(createFeatureIcon(feature)),
      });
    },
    onEachFeature: (feature, layer) => {
      layer.on('click', e => {
        DomEvent.stopPropagation(e);
        onMarkerClick(feature);
      });
      // @TODO fix endless loop
    },
  };

  useEffect(() => {
    if (mapInstance && locations.length) {
      const features = [...locations];

      const layerData = {
        type: 'FeatureCollection',
        name: 'Black spots',
        crs: {
          type: 'name',
          properties: {
            name: 'urn:ogc:def:crs:OGC:1.3:CRS84',
          },
        },
        features,
      };

      setJson(layerData);
    }
  }, [locations, mapInstance]);

  return json ? <GeoJSON args={[json]} options={options} /> : null;
};

export default BlackspotsLayer;
