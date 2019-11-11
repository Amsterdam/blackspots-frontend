import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { Logout } from '@datapunt/asc-assets';
import { appRoutes } from 'constants.js';
import { logout } from 'shared/auth/auth';
import UserContext from 'shared/user/UserContext';
import { Header as HeaderComponent, Link } from '@datapunt/asc-ui';
import { HeaderLink, LogoutLink } from './HeaderStyle';

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
          <LogoutLink
            $as={Link}
            variant="textButton"
            iconSize={16}
            iconLeft={<Logout />}
            onClick={logout}
          >
            Uitloggen
          </LogoutLink>
        </>
      }
    />
  );
};

export default Header;
