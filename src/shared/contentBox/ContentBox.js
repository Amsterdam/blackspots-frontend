import styles from './ContentBox.module.scss';

const ContentBox = ({ children }) => {
  return <div className={styles.Container}>{children}</div>;
};

export default ContentBox;
