import React from 'react';

import { StatusColor, MarkerIcons } from './Map.constants';

export default ({ type, status }) => {
  const Marker = MarkerIcons[type];

  return <Marker fill={StatusColor[status]} />;
};
