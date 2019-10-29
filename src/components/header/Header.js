import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { ReactComponent as Logo } from 'assets/media/amsterdam-logo-small.svg';
import { ReactComponent as Logout } from 'assets/icons/logout.svg';
import { appRoutes } from 'constants.js';
import { logout } from 'shared/auth/auth';
import styles from './Header.module.scss';
import UserContext from 'shared/user/UserContext';

const Header = () => {
  const { canAdd } = useContext(UserContext);

  return (
    <div className={styles.Container}>
      <Logo className={styles.Logo} />
      <NavLink className={styles.Title} exact to={appRoutes.HOME}>
        <h2>Werkgroep Blackspots</h2>
      </NavLink>
      <div className={styles.ButtonBar}>
        <NavLink className={styles.Link} to={appRoutes.HOME}>
          Kaart
        </NavLink>
        {canAdd > 0 && (
          <NavLink className={styles.Link} to={appRoutes.ADD}>
            Toevoegen
          </NavLink>
        )}
        <NavLink className={styles.Link} to={appRoutes.CONCEPTS}>
          Begrippenlijst
        </NavLink>
        <NavLink className={styles.Link} to={appRoutes.CONTACT}>
          Contact
        </NavLink>
        <button className={styles.ButtonLink} onClick={logout}>
          <Logout />
          Uitloggen
        </button>
      </div>
    </div>
  );
};

export default Header;
