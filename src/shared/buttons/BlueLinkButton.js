import React from 'react';
import PropTypes from 'prop-types';
import styles from './BlueLinkButton.module.scss';
import { ReactComponent as ChevronIcon } from 'assets/icons/chevron-left.svg';
import classNames from 'classnames';

function BlueLinkButton({ to, text, external, chevronDirection }) {
  console.log(chevronDirection);
  console.log(chevronDirection === 'right');
  return (
    <a className={styles.Container} href={to} target={external ? '_blank' : ''}>
      <ChevronIcon
        className={classNames(styles.ChevronIcon, {
          [styles.ChevronIconRotated]: chevronDirection === 'right',
        })}
      />
      {text}
    </a>
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
