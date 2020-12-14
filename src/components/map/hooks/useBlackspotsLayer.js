import React, { useEffect, useContext, useState } from 'react';
import L from 'leaflet';
import { useMapInstance, GeoJSON } from '@amsterdam/react-maps';
// import { SpotTypes, SpotStatusTypes } from 'config';
import { FilterContext } from 'shared/reducers/FilterContext';
// import SVGIcon from '../../SVGIcon/SVGIcon';

// import FilterContext from '../../../shared/reducers/FilterContext';

// export const handleFeature = (feature, layer, onClick) => {
//   layer.on('click', ({ latlng }) => {
//     onClick(feature, latlng);
//   });
// };

// const createFeatureIcon = feature => {
//   // Leaflet only accepts HTML elements for custom markers so we need to
//   // create one from the SVGIcon
//   const { status, spot_type: spotType } = feature.properties;
//   const iconDiv = document.createElement('div');
//   ReactDOM.render(<SVGIcon type={spotType} status={status} />, iconDiv);
//   return {
//     // Add the correct classname based on type
//     // Risico types have a bigger icon therefore need more margin
//     className: `marker-div-icon ${
//       spotType === SpotTypes.RISICO ? 'large' : ''
//     } ${status === SpotStatusTypes.GEEN_MAATREGEL ? 'extra-opacity' : ''}`,
//     html: iconDiv,
//   };
// };

// export const createFeature = (feature, latlng) => {
//   // Create a marker with the correct icon and onClick method
//   return L.marker(latlng, {
//     icon: L.divIcon(createFeatureIcon(feature)),
//   });
// };

// const useBlackspotsLayer = (locations, onMarkerClick) => {
//   const mapInstance = useMapInstance();
//   const geoLayerRef = useRef(null);
//   useEffect(() => {
//     geoLayerRef.current = L.geoJSON(locations, {
//       // Add custom markers
//       onEachFeature(feature, layer) {
//         handleFeature(feature, layer, onMarkerClick);
//       },
//       pointToLayer: createFeature,
//     }).addTo(mapInstance);
//   }, [mapInstance, locations, onMarkerClick]);

//   return geoLayerRef;
// };

const BlackspotsLayer = ({ onMarkerClick }) => {
  const { state } = useContext(FilterContext);
  const [json, setJson] = useState('');
  const mapInstance = useMapInstance();

  const geojsonMarkerOptions = {
    radius: 8,
    fillColor: '#ff7800',
    color: '#000',
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8,
  };

  const options = {
    pointToLayer(feature, latlng) {
      return L.circleMarker(latlng, geojsonMarkerOptions);
    },
  };

  useEffect(() => {
    if (mapInstance && state.locations.length) {
      // const features = state.locations.reduce(
      //   (acc, { layer: l }) => [...acc, ...l.features],
      //   []
      // );

      const features = [...state.locations];
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
      console.log('BlackspotsLayer layerData)', layerData);

      setJson(layerData);
    }
  }, [state.locations]);

  return state.locations ? <GeoJSON args={[json]} options={options} /> : null;
};

export default BlackspotsLayer;
