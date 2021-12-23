import { createMemoryHistory } from 'history';
import CustomRouter from './CustomRouter';
import { ThemeProvider } from '@amsterdam/asc-ui';
import { UserContextProvider } from 'shared/user/UserContext';

export const history = createMemoryHistory();
export const withUserContext = (Component, user) => {
  return (
    <CustomRouter history={history}>
      <UserContextProvider user={user}>{Component}</UserContextProvider>;
    </CustomRouter>
  );
};

export const withTheme = (Component) => {
  return (
    <ThemeProvider>
      <CustomRouter history={history}>{Component}</CustomRouter>
    </ThemeProvider>
  );
};
