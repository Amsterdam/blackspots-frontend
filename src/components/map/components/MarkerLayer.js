import { useEffect, useContext } from 'react';
import L from 'leaflet';
import { useMapInstance } from '@amsterdam/react-maps';
import { actions } from 'shared/reducers/filter';
import { FilterContext } from 'shared/reducers/FilterContext';
import MarkerIcon from 'leaflet/dist/images/marker-icon.png';
// import icon from 'leaflet/dist/images/marker-icon.png';
// import icon from 'leaflet/dist/images/marker-icon.png';
// import { getBlackspotYearFromMarker } from 'helpers';
// import { mapPairs } from 'core-js/fn/dict';

const MarkerLayer = () => {
  const {
    state: { marker, selectedLocation },
    dispatch,
  } = useContext(FilterContext);
  const mapInstance = useMapInstance();

  useEffect(() => {
    console.log('MarkerLayer changed selectedLocation');
    const latlng = {
      lat: selectedLocation?.geometry?.coordinates[1],
      lng: selectedLocation?.geometry?.coordinates[0],
    };
    //   console.log('------ coords', selectedLocation?.geometry?.coordinates);
    console.log(
      'MarkerLayer ---------------------',
      marker?.current?.feature?.geometry?.coordinates,
      selectedLocation?.geometry?.coordinates
    );
    if (
      marker?.current &&
      marker?.current?.feature?.geometry?.coordinates[0] !==
        selectedLocation?.geometry?.coordinates[0] &&
      marker?.current?.feature?.geometry?.coordinates[1] !==
        selectedLocation?.geometry?.coordinates[1]
    ) {
      console.log('MarkerLayer ========================= REMOVED', marker);
      // mapInstance.removeLayer(marker.current);
    }

    if (selectedLocation?.geometry?.coordinates) {
      const mrkr = L.marker(latlng, {
        icon: L.icon({
          iconUrl: MarkerIcon,
          iconAnchor: [18, 45],
        }),
      }).addTo(mapInstance);
      mrkr.feature = selectedLocation;
      dispatch(actions.setMarker({ current: mrkr }));
    }
  }, [selectedLocation]);

  return null;
};

export default MarkerLayer;
