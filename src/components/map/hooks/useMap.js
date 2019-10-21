import { useRef, useEffect } from 'react';
import amaps from 'amsterdam-amaps/dist/amaps';

const useMap = () => {
  const mapRef = useRef(null);
  useEffect(() => {
    // Create map
    mapRef.current = amaps.createMap({
      center: {
        latitude: 52.36988741057662,
        longitude: 4.8966407775878915,
      },
      style: 'zwartwit',
      layer: 'standaard',
      target: 'mapdiv',
      search: true,
      zoom: 13,
    });

    // Add the stadsdelen WMS
    L.tileLayer
      .wms('https://map.data.amsterdam.nl/maps/gebieden?', {
        layers: ['stadsdeel'],
        transparent: true,
        format: 'image/png',
      })
      .addTo(mapRef.current);

    // Set zoom config manually after adding WMS
    // For some reason this doesn't work when set during the creation of the map
    mapRef.current.options.minZoom = 12;
    mapRef.current.options.maxZoom = 21;
  }, []);

  return mapRef;
};

export default useMap;
