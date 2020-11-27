import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { Logout } from '@amsterdam/asc-assets';
import { appRoutes } from 'config';
import auth from 'shared/auth/auth';
import UserContext from 'shared/user/UserContext';
import { Header as HeaderComponent, Link } from '@amsterdam/asc-ui';
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
            onClick={auth.logout}
          >
            Uitloggen
          </LogoutLink>
        </>
      }
    />
  );
};

export default Header;
