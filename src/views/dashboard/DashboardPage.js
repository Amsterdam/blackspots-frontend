import React, { useState } from 'react';

import Map from 'components/map/Map';
import ErrorMsg from '../../shared/errorMsg/ErrorMsg';
import styles from './Dashboard.module.scss';

export default () => {
  const [showError, setShowError] = useState(false);

  return (
    <div className={styles.Container}>
      <ErrorMsg isOpen={showError} />
      <Map setShowError={setShowError} />
    </div>
  );
};
