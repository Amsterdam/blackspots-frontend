import { bool } from 'prop-types';
import classNames from 'classnames';
import styles from './ErrorMsg.module.scss';

const ErrorMsg = ({ isOpen }) => {
  return (
    <div
      className={classNames(
        styles.Container,
        isOpen ? styles.ContainerOpen : ''
      )}
    >
      Informatie op de kaart kan niet worden geladen.
    </div>
  );
};

ErrorMsg.propTypes = {
  isOpen: bool.isRequired,
};

export default ErrorMsg;
