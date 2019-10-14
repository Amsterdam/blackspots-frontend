import React from 'react';
import styles from './DataTable.module.scss';

const DataTable = ({ children }) => {
  return <table className={styles.Container}>{children}</table>;
};

export default DataTable;
