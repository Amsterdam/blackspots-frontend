import React from 'react';
import PropTypes from 'prop-types';

import { SpotStatusColor, SpotIcons, SpotStatusTypes } from 'config';
import styles from './SVGIcon.module.scss';

const SVGIcon = ({ type, status, small }) => {
  const Icon = SpotIcons[type];
  const markerStatus = SpotStatusColor[status];

  if (!Icon) {
    // eslint-disable-next-line no-console
    console.error('Unable to resolve spot type:', type);
  }

  if (!small && !markerStatus) {
    // eslint-disable-next-line no-console
    console.error('Unable to resolve spot status:', status);
  }

  if (small) {
    return <Icon className={styles.SmallIcon} />;
  }
  return (
    <Icon
      fill={
        status === SpotStatusTypes.GEEN_MAATREGEL ? '#000000' : markerStatus
      }
    />
  );
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
