import React from 'react';

// import Header from './header/Header';
import LandingPage from 'views/landing/LandingPage';
import { trackPageView } from '../helpers';
import useKeycloak from 'shared/hooks/useKeycloak';
import { GlobalStyle, ThemeProvider } from '@datapunt/asc-ui';
import AppStyle from './AppStyle';
import { UserContextProvider } from 'shared/user/UserContext';
import AppRoutes from './AppRoutes';
import mainReducer, { initialState } from 'shared/reducers';
import { AppStateProvider } from 'shared/hooks/useAppReducer';
import Header from './header/Header';

const App = () => {
  const user = useKeycloak();
  trackPageView();

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
