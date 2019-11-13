import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { UserContextProvider } from 'shared/user/UserContext';

const history = createMemoryHistory();

export const withUserContext = (Component, user, route) => {
  if (route) history.push(route);
  return (
    <UserContextProvider user={user}>
      <Router history={history}>{Component}</Router>
    </UserContextProvider>
  );
};