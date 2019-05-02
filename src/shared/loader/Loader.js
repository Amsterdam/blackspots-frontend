import React from 'react';
import styles from './Loader.module.scss';

export default function Loader() {
  return (
    <div className={styles.LoadingDiv}>
      <div className={styles.LoadingSpinner} />
      Bezig met laden...
    </div>
  );
}
