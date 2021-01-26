import L from 'leaflet';
import { useMapInstance } from '@amsterdam/react-maps';

const StadsdelenLayer = () => {
  const mapInstance = useMapInstance();

  // Add the stadsdelen WMS
  const stadsdelen = L.tileLayer.wms(
    'https://map.data.amsterdam.nl/maps/gebieden?',
    {
      layers: ['stadsdeel'],
      transparent: true,
      format: 'image/png',
    }
  );

  mapInstance.addLayer(stadsdelen);

  return null;
};

export default StadsdelenLayer;
