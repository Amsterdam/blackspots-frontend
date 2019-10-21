import React from 'react';

import BlueLinkButton from 'shared/buttons/BlueLinkButton';
import { appRoutes } from 'constants.js';
import Footer from '../../components/footer/Footer';
import ManageLocationPageStyle, {
  ContentStyle,
} from './ManageLocationPageStyle';

const ManageLocationPage = () => {
  return (
    <ManageLocationPageStyle>
      <ContentStyle>
        <BlueLinkButton
          to={appRoutes.HOME}
          text="Terug naar kaart"
          chevronDirection="left"
        />
        <h1>Toevoegen/Wijzigen</h1>
      </ContentStyle>
      <Footer />
    </ManageLocationPageStyle>
  );
};

export default ManageLocationPage;
