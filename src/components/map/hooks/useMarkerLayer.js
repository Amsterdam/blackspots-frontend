import { useRef, useEffect } from 'react';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';

const useMarkerLayer = (mapRef, latlng) => {
  const layerRef = useRef(null);
  useEffect(() => {
    if (latlng === null) return;
    if (layerRef.current) mapRef.current.removeLayer(layerRef.current)
    layerRef.current = L.marker([latlng.lat, latlng.lng], {
      icon: L.icon({
        iconUrl: icon,
        iconAnchor: [18, 45],
      }),
    }).addTo(mapRef.current);
    const currentZoom = mapRef.current.getZoom();
    mapRef.current.flyTo(latlng, currentZoom < 14 ? 14 : currentZoom);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latlng]);

  return layerRef;
};

export default useMarkerLayer;
