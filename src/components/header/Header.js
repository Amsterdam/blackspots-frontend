import React from "react";
import { Link } from "react-router-dom";

import { HeaderStyled, Logo, Title, ButtonBar } from "./Header.styled";
import logo from "assets/media/amsterdam-logo.svg";

export default () => {
  return (
    <HeaderStyled>
      <Logo src={logo} />
      <Link to="/">
        <Title>Blackspots</Title>
      </Link>
      <ButtonBar>
        <Link to="concepts">Begrippenlijst</Link>
        <Link to="contact">Contact</Link>
      </ButtonBar>
    </HeaderStyled>
  );
};
