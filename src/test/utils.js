import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { ThemeProvider } from '@datapunt/asc-ui';
import { UserContextProvider } from 'shared/user/UserContext';

export const withHistory = route => Component => {
  const history = createMemoryHistory();
  if (route) history.push(route);
  return <Router history={history}>{Component}</Router>;
};

export const withUserContext = (Component, user, route) => {
  return withHistory(route)(
    <UserContextProvider user={user}>{Component}</UserContextProvider>
  );
};

export const withTheme = (Component, route) => {
  return withHistory(route)(<ThemeProvider>{Component}</ThemeProvider>);
};
