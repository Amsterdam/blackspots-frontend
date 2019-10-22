import React from 'react';

import BlueLinkButton from 'shared/buttons/BlueLinkButton';
import { appRoutes } from 'constants.js';
import Footer from '../../components/footer/Footer';
import ManageLocationPageStyle, {
  ContentStyle,
} from './ManageLocationPageStyle';
import ManageForm from './ManageForm';

const ManageLocationPage = () => {
  return (
    <ManageLocationPageStyle>
      <ContentStyle>
        <BlueLinkButton
          to={appRoutes.HOME}
          text="Terug naar kaart"
          chevronDirection="left"
        />
        <ManageForm />
      </ContentStyle>
      <Footer />
    </ManageLocationPageStyle>
  );
};

export default ManageLocationPage;
