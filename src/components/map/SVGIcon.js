import React from 'react';

import { StatusColor, MarkerIcons } from './Map.constants';

export default ({ type, status }) => {
  const SVGIcon = MarkerIcons[type];

  return <SVGIcon fill={StatusColor[status]} />;
};
