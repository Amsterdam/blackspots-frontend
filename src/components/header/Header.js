import React from 'react';
import { NavLink } from 'react-router-dom';

import { NavLinkStyled, HeaderStyled, Logo, ButtonBar } from './Header.styled';
import logo from 'assets/media/amsterdam-logo.svg';
import { appRoutes } from 'constants.js';
import auth from 'shared/auth/auth';

const logout = () => {
  const keycloak = auth.keycloak;
  keycloak.logout();
};

export default () => {
  return (
    <HeaderStyled>
      <Logo src={logo} />
      <NavLink exact to={appRoutes.HOME}>
        <h2>Werkgroepblackspots</h2>
      </NavLink>
      <ButtonBar>
        <button onClick={logout}>
          <span>Uitloggen</span>
        </button>
        <NavLinkStyled to={appRoutes.CONCEPTS}>Begrippenlijst</NavLinkStyled>
        <NavLinkStyled to={appRoutes.CONTACT}>Contact</NavLinkStyled>
      </ButtonBar>
    </HeaderStyled>
  );
};
