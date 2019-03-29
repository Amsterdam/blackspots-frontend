import React from 'react';

import { BlackspotStatusColor, MarkerIcons } from 'constants.js';

import './SVGIcon.css';

const SVGIcon = ({ type, status, small }) => {
  const SVGIcon = MarkerIcons[type];

  if (small) {
    return <SVGIcon className="small-icon" />;
  } else {
    return <SVGIcon fill={BlackspotStatusColor[status]} />;
  }
};

SVGIcon.defaultProps = {
  small: false,
};

export default SVGIcon;
