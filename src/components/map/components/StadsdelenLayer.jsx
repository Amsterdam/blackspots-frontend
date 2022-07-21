import L from 'leaflet';
import { useMapInstance } from '@amsterdam/arm-core';

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

  return <></>;
};

export default StadsdelenLayer;
