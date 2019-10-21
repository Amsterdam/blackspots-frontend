import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from '@datapunt/asc-core';

import Header from './header/Header';
import DashboardPage from 'views/dashboard/DashboardPage';
import ConceptPage from 'views/concepts/ConceptPage';
import ContactPage from 'views/contact/ContactPage';
import { appRoutes } from 'constants.js';
import LandingPage from '../views/landing/LandingPage';
import { trackPageView } from '../helpers';
import useKeycloak from '../shared/hooks/useKeycloak';
import { GlobalStyle, ThemeProvider } from '@datapunt/asc-ui';
import AppStyle, { ContentStyle } from './AppStyle';

const App = () => {
  const authenticated = useKeycloak();
  trackPageView();

  return (
    <ThemeProvider>
      <GlobalStyle />
      <AppStyle>
        {authenticated ? (
          <>
            <Header />
            <ContentStyle>
              <Switch>
                <Route
                  exact
                  path={appRoutes.CONCEPTS}
                  component={ConceptPage}
                />
                <Route exact path={appRoutes.CONTACT} component={ContactPage} />
                <Route path={appRoutes.HOME} component={DashboardPage} />
              </Switch>
            </ContentStyle>
          </>
        ) : (
          <LandingPage />
        )}
      </AppStyle>
    </ThemeProvider>
  );
};

export default App;
