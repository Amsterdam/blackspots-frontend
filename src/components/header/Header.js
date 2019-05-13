import React from 'react';
import { NavLink } from 'react-router-dom';

import { ReactComponent as Logo } from 'assets/media/amsterdam-logo-small.svg';
import { ReactComponent as Logout } from 'assets/icons/logout.svg';
import { appRoutes } from 'constants.js';
import auth from 'shared/auth/auth';
import styles from './Header.module.scss';

const logout = () => {
  const keycloak = auth.keycloak;
  keycloak.logout();
};

export default () => {
  return (
    <div className={styles.Container}>
      <Logo className={styles.Logo} />
      <NavLink className={styles.Title} exact to={appRoutes.HOME}>
        <h2>Werkgroepblackspots</h2>
      </NavLink>
      <div className={styles.ButtonBar}>
        <button className={styles.ButtonLink} onClick={logout}>
          <Logout />
          Uitloggen
        </button>
        <NavLink
          className={styles.Link}
          activeClassName={styles.LinkActive}
          to={appRoutes.CONCEPTS}
        >
          Begrippenlijst
        </NavLink>
        <NavLink
          className={styles.Link}
          activeClassName={styles.LinkActive}
          to={appRoutes.CONTACT}
        >
          Contact
        </NavLink>
      </div>
    </div>
  );
};
