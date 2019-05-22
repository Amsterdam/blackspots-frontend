import React from 'react';
import styles from './ContentBox.module.scss';

export default props => {
  return <div className={styles.Container}>{props.children}</div>;
};
