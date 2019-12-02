import { useRef, useEffect, useState } from 'react';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';

const useMarkerLayer = (mapRef) => {
  const layerRef = useRef(null);
  const [location, setLocation] = useState(null);
  useEffect(() => {
    if (location === null) return;
    if (layerRef.current) {
      mapRef.current.removeLayer(layerRef.current);
    }
    layerRef.current = L.marker([location.lat, location.lng], {
      icon: L.icon({
        iconUrl: icon,
        iconAnchor: [18, 45],
      }),
    }).addTo(mapRef.current);
    const currentZoom = mapRef.current.getZoom();
    mapRef.current.flyTo(location, currentZoom < 14 ? 14 : currentZoom);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return { layerRef, setLocation };
};

export default useMarkerLayer;
