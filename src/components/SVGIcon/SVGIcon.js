import React from 'react';
import PropTypes from 'prop-types';

import { SpotStatusColor, SpotIcons } from 'constants.js';
import styles from './SVGIcon.module.scss';

const SVGIcon = ({ type, status, small }) => {
  const SVGIcon = SpotIcons[type];
  const markerStatus = SpotStatusColor[status];

  if (!SVGIcon) {
    console.error('Unable to resolve spot type: ', type);
  }

  if (markerStatus) {
    console.error('Unable to resolve spot type: ', type);
  }

  if (small) {
    return <SVGIcon className={styles.SmallIcon} />;
  } else {
    return <SVGIcon fill={markerStatus} />;
  }
};

SVGIcon.defaultProps = {
  small: false,
  status: null,
};

SVGIcon.propTypes = {
  small: PropTypes.bool,
  type: PropTypes.oneOf(Object.keys(SpotIcons)).isRequired,
  status: PropTypes.oneOf(Object.keys(SpotStatusColor)),
};

export default SVGIcon;
