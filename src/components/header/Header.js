import React from "react";
import { HeaderStyled, Logo, Title, ButtonBar } from "./Header.styled";
import logo from "assets/media/amsterdam-logo.svg";

export default () => {
  return (
    <HeaderStyled>
      <Logo src={logo} />
      <Title>Blackspots</Title>
      <ButtonBar>
        <a>Begrippenlijst</a>
        <a>Contact</a>
      </ButtonBar>
    </HeaderStyled>
  );
};
