import React from 'react';

import Footer from '../../components/footer/Footer';
import ManageLocationPageStyle, {
  ContentStyle,
} from './ManageLocationPageStyle';
import ManageForm from './ManageForm';

const ManageLocationPage = ({ match }) => {
  const {
    params: { id },
  } = match;
  return (
    <ManageLocationPageStyle className="page-style">
      <ContentStyle className="content-style">
        <ManageForm id={id} className="manage-form" />
      </ContentStyle>
      <Footer />
    </ManageLocationPageStyle>
  );
};

export default ManageLocationPage;
