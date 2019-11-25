import React, { useEffect } from 'react';

import LandingPage from 'views/landing/LandingPage';
import useKeycloak from 'shared/hooks/useKeycloak';
import { GlobalStyle, ThemeProvider } from '@datapunt/asc-ui';
import { useMatomo } from '@datapunt/matomo-tracker-react';
import AppStyle from './AppStyle';
import { UserContextProvider } from 'shared/user/UserContext';
import AppRoutes from './AppRoutes';
import mainReducer, { initialState } from 'shared/reducers';
import { AppStateProvider } from 'shared/hooks/useAppReducer';
import Header from './header/Header';

const App = () => {
  const user = useKeycloak();
  const { trackPageView } = useMatomo()

  useEffect(() => trackPageView(), []);

  return (
    <UserContextProvider user={user}>
      <AppStateProvider initialState={initialState} reducer={mainReducer}>
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
      </AppStateProvider>
    </UserContextProvider>
  );
};

export default App;
