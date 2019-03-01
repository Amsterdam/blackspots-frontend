import React from "react";

import BlueLinkButton from "shared/buttons/BlueLinkButton";
import ContentBox from "../../shared/contentBox/ContentBox";

export default () => {
  return (
    <ContentBox>
      <BlueLinkButton chevDirection="left" text="Terug naar kaart" />
      <h2>Begrippenlijst</h2>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
    </ContentBox>
  );
};
