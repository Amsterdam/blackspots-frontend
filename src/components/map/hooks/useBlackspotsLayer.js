import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import L from 'leaflet';
import { SpotTypes, SpotStatusTypes } from 'config';
import SVGIcon from '../../SVGIcon/SVGIcon';

const useBlackspotsLayer = (mapRef, locations, onMarkerClick) => {
  const geoLayerRef = useRef(null);
  useEffect(() => {
    geoLayerRef.current = L.geoJSON(locations, {
      // Add custom markers
      onEachFeature(feature, layer) {
        layer.on('click', ({ latlng }) => {
          onMarkerClick(feature, latlng);
        });
      },
      pointToLayer(feature, latlng) {
        // Leaflet only accepts HTML elements for custom markers so we need to
        // create one from the SVGIcon
        const { status, spot_type: spotType } = feature.properties;
        const iconDiv = document.createElement('div');
        ReactDOM.render(<SVGIcon type={spotType} status={status} />, iconDiv);

        // Create a marker with the correct icon and onClick method
        return L.marker(latlng, {
          icon: L.divIcon({
            // Add the correct classname based on type
            // Risico types have a bigger icon therefore need more margin
            className: `marker-div-icon ${
              spotType === SpotTypes.RISICO ? 'large' : ''
            } ${
              status === SpotStatusTypes.GEEN_MAATREGEL ? 'extra-opacity' : ''
            }`,
            html: iconDiv,
          }),
        });
      },
    }).addTo(mapRef.current);
  }, [mapRef, locations]);

  return geoLayerRef;
};

export default useBlackspotsLayer;
