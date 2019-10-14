import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import styles from './App.module.scss';
import Header from './header/Header';
import DashboardPage from 'views/dashboard/DashboardPage';
import ConceptPage from 'views/concepts/ConceptPage';
import ContactPage from 'views/contact/ContactPage';
import { appRoutes } from 'constants.js';
import LandingPage from '../views/landing/LandingPage';
import { trackPageView } from '../helpers';
import withKeycloak from '../hoc/withKeyCloak';

const App = ({ authenticated }) => {
  trackPageView();

  return (
    <div className={styles.App}>
      {authenticated ? (
        <>
          <Header />
          <div className={styles.Content}>
            <Switch>
              <Route exact path={appRoutes.CONCEPTS} component={ConceptPage} />
              <Route exact path={appRoutes.CONTACT} component={ContactPage} />
              <Route path={appRoutes.HOME} component={DashboardPage} />
            </Switch>
          </div>
        </>
      ) : (
        <LandingPage />
      )}
    </div>
  );
};

App.propTypes = {
  authenticated: PropTypes.bool,
};

export default withKeycloak(App);
