import React, { useEffect } from 'react';

import LandingPage from 'views/landing/LandingPage';
import useKeycloak from 'shared/hooks/useKeycloak';
import { GlobalStyle, ThemeProvider } from '@amsterdam/asc-ui';
import { useMatomo } from '@datapunt/matomo-tracker-react';
import { UserContextProvider } from 'shared/user/UserContext';
import FilterContextProvider from 'shared/reducers/FilterContext';
import AppRoutes from './AppRoutes';
import AppStyle from './AppStyle';
import Header from './header/Header';

const App = () => {
  const user = useKeycloak();
  const { trackPageView } = useMatomo();

  useEffect(() => trackPageView(), [trackPageView]);

  return (
    <UserContextProvider user={user}>
      <FilterContextProvider>
        <ThemeProvider>
          <GlobalStyle />
          <AppStyle data-testid="app">
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
      </FilterContextProvider>
    </UserContextProvider>
  );
};

export default App;
