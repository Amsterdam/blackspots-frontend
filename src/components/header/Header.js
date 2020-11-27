import React, { useContext } from 'react';

import { Logout } from '@amsterdam/asc-assets';
import { appRoutes } from 'config';
import auth from 'shared/auth/auth';
import UserContext from 'shared/user/UserContext';
import {
  Header as HeaderComponent,
  Link,
  MenuItem,
  MenuButton,
} from '@amsterdam/asc-ui';
import { LogoutLink } from './HeaderStyle';

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
          <MenuItem>
            <MenuButton forwardedAs="a" href={appRoutes.HOME}>
              Kaart
            </MenuButton>
          </MenuItem>

          {canAdd > 0 && (
            <MenuItem>
              <MenuButton forwardedAs="a" href={appRoutes.ADD}>
                Toevoegen
              </MenuButton>
            </MenuItem>
          )}

          <MenuItem>
            <MenuButton forwardedAs="a" href={appRoutes.CONCEPTS}>
              Begrippenlijst
            </MenuButton>
          </MenuItem>
          <MenuItem>
            <MenuButton forwardedAs="a" href={appRoutes.CONTACT}>
              Contact
            </MenuButton>
          </MenuItem>
          <MenuItem>
            <LogoutLink
              $as={Link}
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
