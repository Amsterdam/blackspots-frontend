import React from 'react';
import styles from './DataTable.module.scss';

export default ({ children }) => {
  return <table className={styles.Container}>{children}</table>;
};
