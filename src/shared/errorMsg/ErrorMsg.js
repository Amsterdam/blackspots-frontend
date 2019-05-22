import React from 'react';
import classNames from 'classnames';
import styles from './ErrorMsg.module.scss';

export default function ErrorMsg({ isOpen }) {
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
}
