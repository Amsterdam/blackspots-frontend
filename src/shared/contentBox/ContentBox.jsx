import PropTypes from 'prop-types';
import styles from './ContentBox.module.scss';

const ContentBox = ({ children }) => {
  return <div className={styles.Container}>{children}</div>;
};

ContentBox.propTypes = {
  children: PropTypes.node,
};

export default ContentBox;
