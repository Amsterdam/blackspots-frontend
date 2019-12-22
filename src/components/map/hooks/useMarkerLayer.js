import { useRef, useEffect, useState } from 'react';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';

const useMarkerLayer = mapRef => {
  const layerRef = useRef(null);
  const [location, setLocation] = useState(null);
  useEffect(() => {
    if (location === null) return;
    const latlng = {
      lat: location.geometry.coordinates[1],
      lng: location.geometry.coordinates[0],
    };
    if (layerRef.current) {
      mapRef.current.removeLayer(layerRef.current);
    }
    layerRef.current = L.marker([latlng.lat, latlng.lng], {
      icon: L.icon({
        iconUrl: icon,
        iconAnchor: [18, 45],
      }),
    }).addTo(mapRef.current);
    layerRef.current.feature = location;
    const currentZoom = mapRef.current.getZoom();

    mapRef.current.flyTo(latlng, currentZoom < 14 ? 14 : currentZoom);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return { layerRef, location, setLocation };
};

export default useMarkerLayer;
