import React from 'react';
import PropTypes from 'prop-types';
import styles from './BlueLinkButton.module.scss';
import { Link } from 'react-router-dom';
import { ReactComponent as ChevronIcon } from 'assets/icons/chevron-left.svg';
import classNames from 'classnames';

function BlueLinkButton({ to, text, external, chevronDirection }) {
  function getContent() {
    return (
      <>
        <ChevronIcon
          className={classNames(styles.ChevronIcon, {
            [styles.ChevronIconRotated]: chevronDirection === 'right',
          })}
        />
        {text}
      </>
    );
  }

  return external ? (
    <a
      className={styles.Container}
      href={to}
      target="_blank"
      rel="noopener noreferrer"
    >
      {getContent()}
    </a>
  ) : (
    <Link className={styles.Container} to={to}>
      {getContent()}
    </Link>
  );
}

BlueLinkButton.propTypes = {
  chevronDirection: PropTypes.oneOf(['left', 'right']),
  text: PropTypes.string.isRequired,
  external: PropTypes.bool,
  to: PropTypes.string.isRequired,
};

BlueLinkButton.defaultProps = {
  chevronDirection: 'right',
  external: false,
};

export default BlueLinkButton;
