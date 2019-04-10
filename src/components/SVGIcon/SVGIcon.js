import React from 'react';
import PropTypes from 'prop-types';

import { BlackspotStatusColor, MarkerIcons } from 'constants.js';

import './SVGIcon.css';

const SVGIcon = ({ type, status, small }) => {
  const SVGIcon = MarkerIcons[type];

  if (!SVGIcon || !BlackspotStatusColor[status]) {
    console.error('Unable to resolve a spot type or status');
    return '';
  }

  if (small) {
    return <SVGIcon className="small-icon" />;
  } else {
    return <SVGIcon fill={BlackspotStatusColor[status]} />;
  }
};

SVGIcon.defaultProps = {
  small: false,
};

SVGIcon.propTypes = {
  small: PropTypes.bool,
  type: PropTypes.oneOf(Object.keys(MarkerIcons)).isRequired,
  status: PropTypes.oneOf(Object.keys(BlackspotStatusColor)).isRequired,
};

export default SVGIcon;
