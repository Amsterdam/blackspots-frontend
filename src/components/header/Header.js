import React, { useContext } from 'react';

import { Link } from 'react-router-dom';
import { Logout } from '@amsterdam/asc-assets';
import { appRoutes } from 'config';
import auth from 'shared/auth/auth';
import UserContext from 'shared/user/UserContext';
import { MenuItem } from '@amsterdam/asc-ui';
import { StyledHeader, LogoutLink } from './HeaderStyle';

const Header = () => {
  const { canAdd } = useContext(UserContext);

  return (
    <StyledHeader
      tall={false}
      title="Werkgroep Blackspots"
      homeLink="/"
      fullWidth
      navigation={
        <>
          <MenuItem>
            <Link to={appRoutes.HOME}>Kaart</Link>
          </MenuItem>

          {canAdd > 0 && (
            <MenuItem>
              <Link to={appRoutes.ADD}>Toevoegen</Link>
            </MenuItem>
          )}

          <MenuItem>
            <Link to={appRoutes.CONCEPTS}>Begrippenlijst</Link>
          </MenuItem>
          <MenuItem>
            <Link to={appRoutes.CONTACT}>Contact</Link>
          </MenuItem>
          <MenuItem>
            <LogoutLink
              variant="textButton"
              iconSize={16}
              iconLeft={<Logout />}
              onClick={auth.logout}
            >
              Uitloggen
            </LogoutLink>
          </MenuItem>
        </>
      }
    />
  );
};

export default Header;
