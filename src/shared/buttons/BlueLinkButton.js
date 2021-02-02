import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { ReactComponent as ChevronIcon } from 'assets/icons/chevron-left.svg';
import classNames from 'classnames';
import { Link } from '@amsterdam/asc-ui';
import styles from './BlueLinkButton.module.scss';

const LinkContent = ({ text, chevronDirection }) => {
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
};

const BlueLinkButton = ({ href, text, external, chevronDirection }) => {
  return external ? (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      variant="inline"
    >
      <LinkContent text={text} chevronDirection={chevronDirection} />
    </Link>
  ) : (
    <Link $as={RouterLink} className={styles.Container} href={href}>
      <LinkContent text={text} chevronDirection={chevronDirection} />
    </Link>
  );
};

BlueLinkButton.propTypes = {
  chevronDirection: PropTypes.oneOf(['left', 'right']),
  text: PropTypes.string.isRequired,
  external: PropTypes.bool,
  href: PropTypes.string.isRequired,
};

BlueLinkButton.defaultProps = {
  chevronDirection: 'right',
  external: false,
};

export default BlueLinkButton;
