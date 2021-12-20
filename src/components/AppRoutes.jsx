import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';

import DashboardPage from 'views/dashboard/DashboardPage';
import ConceptPage from 'views/concepts/ConceptPage';
import ContactPage from 'views/contact/ContactPage';
import { appRoutes } from 'config';
import LocationForm from 'components/locationForm/LocationForm';
import UserContext from 'shared/user/UserContext';
import { ContentStyle } from './AppStyle';

const AppRoutes = () => {
  const { canAdd, canEdit } = useContext(UserContext);

  return (
    <ContentStyle>
      <Routes>
        <Route exact path={appRoutes.CONCEPTS} element={ConceptPage} />
        <Route exact path={appRoutes.CONTACT} element={ContactPage} />
        {canAdd && (
          <Route exact path={appRoutes.ADD} element={LocationForm} />
        )}
        {canEdit && (
          <Route exact path={appRoutes.EDIT} element={LocationForm} />
        )}
        <Route path={appRoutes.HOME} element={DashboardPage} />
      </Routes>
    </ContentStyle>
  );
};

export default AppRoutes;
