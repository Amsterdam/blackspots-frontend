import React from "react";
import { NavLink } from "react-router-dom";

import BlueLinkButton from "shared/buttons/BlueLinkButton";
import ContentBox from "../../shared/contentBox/ContentBox";
import Accordion from "../../shared/accordion/Accordion";
import { appRoutes } from "constants.js";

export default () => {
  return (
    <ContentBox>
      <NavLink to={appRoutes.HOME}>
        <BlueLinkButton chevDirection="left" text="Terug naar kaart" />
      </NavLink>
      <h2>Contact</h2>
    </ContentBox>
  );
};
