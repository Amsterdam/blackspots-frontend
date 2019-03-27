import React from 'react';

import { StatusColor, MarkerTypes } from './Map.constants';

export default ({ type, status }) => {
  const Marker = MarkerTypes[type];

  return <Marker fill={StatusColor[status]} />;
};
