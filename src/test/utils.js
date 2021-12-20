import { createMemoryHistory } from 'history';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@amsterdam/asc-ui';
import { UserContextProvider } from 'shared/user/UserContext';

export const history = createMemoryHistory();

export const withUserContext = (Component, user) => {
  return (
    <MemoryRouter history={history}>
      <UserContextProvider user={user}>{Component}</UserContextProvider>;
    </MemoryRouter>
  );
};

export const withTheme = (Component) => {
  return (
    <ThemeProvider>
      <MemoryRouter history={history}>{Component}</MemoryRouter>
    </ThemeProvider>
  );
};
