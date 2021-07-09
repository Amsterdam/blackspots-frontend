import { useContext } from 'react';

import { Link as RouterLink } from 'react-router-dom';

import { Logout } from '@amsterdam/asc-assets';
import { appRoutes } from 'config';
import auth from 'shared/auth/auth';
import UserContext from 'shared/user/UserContext';
import { Header as HeaderComponent, MenuItem, Link } from '@amsterdam/asc-ui';
import { LogoutLink, MenuButton } from './HeaderStyle';

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
            <MenuButton as={RouterLink} to={appRoutes.HOME}>
              Kaart
            </MenuButton>
          </MenuItem>

          {canAdd > 0 && (
            <MenuItem>
              <Link as={RouterLink} to={appRoutes.ADD}>
                Toevoegen
              </Link>
            </MenuItem>
          )}

          <MenuItem>
            <MenuButton as={RouterLink} to={appRoutes.CONCEPTS}>
              Begrippenlijst
            </MenuButton>
          </MenuItem>
          <MenuItem>
            <MenuButton as={RouterLink} to={appRoutes.CONTACT}>
              Contact
            </MenuButton>
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
