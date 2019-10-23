import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';

import DashboardPage from 'views/dashboard/DashboardPage';
import ConceptPage from 'views/concepts/ConceptPage';
import ContactPage from 'views/contact/ContactPage';
import { appRoutes } from '../constants';
import ManageLocationPage from 'views/manage/ManageLocationPage';
import UserContext from 'shared/user/UserContext';
import { ContentStyle } from './AppStyle';

const AppRoutes = () => {
  const { canAdd, canEdit } = useContext(UserContext);

  return (
    <ContentStyle>
      <Switch>
        <Route exact path={appRoutes.CONCEPTS} component={ConceptPage} />
        <Route exact path={appRoutes.CONTACT} component={ContactPage} />
        {canAdd && (
          <Route exact path={appRoutes.ADD} component={ManageLocationPage} />
        )}
        {canEdit && (
          <Route exact path={appRoutes.EDIT} component={ManageLocationPage} />
        )}
        <Route path={appRoutes.HOME} component={DashboardPage} />
      </Switch>
    </ContentStyle>
  );
};

export default AppRoutes;