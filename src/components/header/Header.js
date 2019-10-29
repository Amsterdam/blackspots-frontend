import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { ReactComponent as Logout } from 'assets/icons/logout.svg';
import { appRoutes } from 'constants.js';
import { logout } from 'shared/auth/auth';
import styles from './Header.module.scss';
import UserContext from 'shared/user/UserContext';
import {
  Header as HeaderComponent,
  Link,
  themeSpacing,
} from '@datapunt/asc-ui';
import styled from '@datapunt/asc-core';

const HeaderLink = styled(Link)`
  margin-right: ${themeSpacing(5)};
`;

const Header = () => {
  const { canAdd } = useContext(UserContext);

  return (
    <HeaderComponent
      tall={false}
      title="Werkgroep Blackspots"
      homeLink="/"
      fullWidth
      navigation={
        <>
          <div className={styles.ButtonBar}>
            <HeaderLink $as={NavLink} to={appRoutes.HOME} variant="blank">
              Kaart
            </HeaderLink>
            {canAdd > 0 && (
              <HeaderLink $as={NavLink} to={appRoutes.ADD} variant="blank">
                Toevoegen
              </HeaderLink>
            )}
            <HeaderLink $as={NavLink} to={appRoutes.CONCEPTS} variant="blank">
              Begrippenlijst
            </HeaderLink>
            <HeaderLink $as={NavLink} to={appRoutes.CONTACT} variant="blank">
              Contact
            </HeaderLink>
            <button className={styles.ButtonLink} onClick={logout}>
              <Logout />
              Uitloggen
            </button>
          </div>
        </>
      }
    />
  );
};

export default Header;
