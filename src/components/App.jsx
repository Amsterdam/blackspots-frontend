import React from 'react';

import Header from './header/Header';
import LandingPage from 'views/landing/LandingPage';
import { trackPageView } from '../helpers';
import useKeycloak from 'shared/hooks/useKeycloak';
import { GlobalStyle, ThemeProvider } from '@datapunt/asc-ui';
import AppStyle from './AppStyle';
import UserContext from 'shared/user/UserContext';
import AppRoutes from './AppRoutes';

const App = () => {
  const user = useKeycloak();
  trackPageView();

  return (
    <UserContext.Provider value={user}>
      <ThemeProvider>
        <GlobalStyle />
        <AppStyle>
          {user.authenticated ? (
            <>
              <Header />
              <AppRoutes />
            </>
          ) : (
            <LandingPage />
          )}
        </AppStyle>
      </ThemeProvider>
    </UserContext.Provider>
  );
};

export default App;
