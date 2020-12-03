import { useRef, useEffect, useState } from 'react';
import L from 'leaflet';
import { useMapInstance } from '@amsterdam/react-maps';

// import icon from 'leaflet/dist/images/marker-icon.png';
import icon from 'leaflet/dist/images/marker-icon.png';

const useMarkerLayer = () => {
  const mapInstance = useMapInstance();
  const layerRef = useRef(null);
  const [location, setLocation] = useState(null);
  useEffect(() => {
    if (location === null) return;
    const latlng = {
      lat: location.geometry.coordinates[1],
      lng: location.geometry.coordinates[0],
    };
    if (layerRef.current) {
      mapInstance.removeLayer(layerRef.current);
    }
    layerRef.current = L.marker([latlng.lat, latlng.lng], {
      icon: L.icon({
        iconUrl: icon,
        iconAnchor: [18, 45],
      }),
    }).addTo(mapInstance);
    layerRef.current.feature = location;
    const currentZoom = mapInstance.getZoom();

    mapInstance.flyTo(latlng, currentZoom < 14 ? 14 : currentZoom);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return { markerLayerRef: layerRef, location, markerSetLocation: setLocation };
};

export default useMarkerLayer;
