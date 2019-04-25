import React from 'react';
import { NavLink } from 'react-router-dom';

import {
  NavLinkStyled,
  HeaderStyled,
  Logo,
  Title,
  ButtonBar
} from "./Header.styled";
import logo from "assets/media/amsterdam-logo.svg";
import { appRoutes } from "constants.js";
import auth from "shared/auth/auth";

const onClickInfo = () => {
  console.log('info button clicked');

  const keycloak = auth.keycloak;
  keycloak.updateToken().success(function() {
    console.log(`token: ${keycloak.token}`);
    console.log(`subject: ${keycloak.subject}`);
  }).error(function(e) {
    console.error('Failed to refresh token', e);
  });
};

const onSendAPICall = () => {
  console.log('sending auhenticated API call');

  const keycloak = auth.keycloak;

  keycloak.updateToken().success(function() {
    const token = keycloak.token;
    if (!token) {
      console.error('missing token');
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`
    };

    fetch('https://api.data.amsterdam.nl/blackspots/spots/', { headers })
      .then(data => data.json())
      .then(json => {
        console.log('received: ', json)
      })
  }).error(function(e) {
    console.error('Failed to refresh token', e);
  });
};

export default () => {
  return (
    <HeaderStyled>
      <Logo src={logo} />
      <NavLink exact to={appRoutes.HOME}>
        <h2>Werkgroepblackspots</h2>
      </NavLink>
      <ButtonBar>
        <button onClick={onClickInfo}>Log auth info</button>
        <button onClick={onSendAPICall}>Send API call</button>
        <NavLinkStyled to={appRoutes.CONCEPTS}>Begrippenlijst</NavLinkStyled>
        <NavLinkStyled to={appRoutes.CONTACT}>Contact</NavLinkStyled>
      </ButtonBar>
    </HeaderStyled>
  );
};
