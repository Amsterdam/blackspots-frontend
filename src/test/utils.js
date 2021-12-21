import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { ThemeProvider } from '@amsterdam/asc-ui';
import { UserContextProvider } from 'shared/user/UserContext';

export const history = createMemoryHistory();
export const withUserContext = (Component, user) => {
  return (
    <Router history={history}>
      <UserContextProvider user={user}>{Component}</UserContextProvider>;
    </Router>
  );
};

export const withTheme = (Component) => {
  return (
    <ThemeProvider>
      <Router history={history}>{Component}</Router>
    </ThemeProvider>
  );
};
