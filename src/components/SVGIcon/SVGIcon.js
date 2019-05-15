import React from 'react';
import PropTypes from 'prop-types';

import { SpotStatusColor, SpotIcons } from 'constants.js';
import styles from './SVGIcon.module.scss';
import { SpotStatusTypes } from '../../constants';

const SVGIcon = ({ type, status, small }) => {
  const SVGIcon = SpotIcons[type];
  const markerStatus = SpotStatusColor[status];

  if (!SVGIcon) {
    console.error('Unable to resolve spot type:', type);
  }

  if (!small && !markerStatus) {
    console.error('Unable to resolve spot status:', status);
  }

  if (small) {
    return <SVGIcon className={styles.SmallIcon} />;
  } else {
    return (
      <SVGIcon
        fill={
          status === SpotStatusTypes.GEEN_MAATREGEL ? '#000000' : markerStatus
        }
      />
    );
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
