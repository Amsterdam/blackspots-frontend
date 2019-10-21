import React from 'react';
import styles from './Loader.module.scss';

const Loader = () => {
  return (
    <div className={styles.LoadingDiv}>
      <div className={styles.LoadingSpinner} />
      Bezig met laden...
    </div>
  );
};

export default Loader;
