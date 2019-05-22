import React from 'react';
import { Switch, Route } from 'react-router-dom';

import styles from './App.module.scss';
import Header from './header/Header';
import DashboardPage from 'views/dashboard/DashboardPage';
import ConceptPage from 'views/concepts/ConceptPage';
import ContactPage from 'views/contact/ContactPage';
import { appRoutes } from 'constants.js';
import LandingPage from '../views/landing/LandingPage';

class App extends React.Component {
  render() {
    const { authenticated } = this.props;
    return (
      <div className={styles.App}>
        {authenticated ? (
          <>
            <Header />
            <div className={styles.Content}>
              <Switch>
                <Route
                  exact
                  path={appRoutes.CONCEPTS}
                  component={ConceptPage}
                />
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
  }
}

export default App;
