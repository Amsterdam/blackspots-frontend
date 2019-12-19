import React from 'react';

import LocationPageStyle, { ContentStyle } from './LocationPageStyle';
import LocationForm from 'components/locationForm/LocationForm';

const LocationPage = ({ match }) => {
  const {
    params: { id },
  } = match;
  return (
    <LocationPageStyle>
      <ContentStyle>
        <LocationForm id={id} />
      </ContentStyle>
    </LocationPageStyle>
  );
};

export default LocationPage;
