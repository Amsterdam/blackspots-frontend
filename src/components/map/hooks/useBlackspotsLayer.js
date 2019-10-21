import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import L from 'leaflet';
import SVGIcon from '../../SVGIcon/SVGIcon';
import { SpotTypes, SpotStatusTypes } from 'constants.js';

const useBlackspotsLayer = (mapRef, results, onMarkerClick) => {
  const geoLayerRef = useRef(null);
  useEffect(() => {
    geoLayerRef.current = L.geoJSON(results, {
      // Add custom markers
      onEachFeature: function(feature, layer) {
        layer.on('click', ({ latlng }) => {
          onMarkerClick(feature, latlng);
        });
      },
      pointToLayer: function(feature, latlng) {
        // Leaflet only accepts HTML elements for custom markers so we need to
        // create one from the SVGIcon
        const { status, spot_type } = feature.properties;
        const iconDiv = document.createElement('div');
        ReactDOM.render(<SVGIcon type={spot_type} status={status} />, iconDiv);

        // Create a marker with the correct icon and onClick method
        return L.marker(latlng, {
          icon: L.divIcon({
            // Add the correct classname based on type
            // Risico types have a bigger icon therefore need more margin
            className: `marker-div-icon ${
              spot_type === SpotTypes.RISICO ? 'large' : ''
            } ${
              status === SpotStatusTypes.GEEN_MAATREGEL ? 'extra-opacity' : ''
            }`,
            html: iconDiv,
          }),
        });
      },
    }).addTo(mapRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results]);

  return geoLayerRef;
};

export default useBlackspotsLayer;
