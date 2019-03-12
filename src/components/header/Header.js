import React from "react";
import { NavLink } from "react-router-dom";

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

const onClickLogin = () => {
  console.log('login button clicked');

  const keycloak = auth.keycloak;
  console.log(`token: ${keycloak.token}`);
  console.log(`subject: ${keycloak.subject}`);
};

export default () => {
  return (
    <HeaderStyled>
      <Logo src={logo} />
      <NavLink exact to={appRoutes.HOME}>
        <Title>Blackspots</Title>
      </NavLink>
      <ButtonBar>
        <button onClick={onClickLogin}>Log auth info</button>
        <NavLinkStyled to={appRoutes.CONCEPTS}>Begrippenlijst</NavLinkStyled>
        <NavLinkStyled to={appRoutes.CONTACT}>Contact</NavLinkStyled>
      </ButtonBar>
    </HeaderStyled>
  );
};
