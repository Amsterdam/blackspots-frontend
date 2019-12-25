import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { ThemeProvider } from '@datapunt/asc-ui';
import { UserContextProvider } from 'shared/user/UserContext';
import { SpotTypes, SpotStatusTypes } from 'config';

export const history = createMemoryHistory();

export const withUserContext = (Component, user) => {
  return (
    <Router history={history}>
      <UserContextProvider user={user}>{Component}</UserContextProvider>;
    </Router>
  );
};

export const withTheme = Component => {
  return (
    <ThemeProvider>
      <Router history={history}>{Component}</Router>
    </ThemeProvider>
  );
};

export const createTestMarker = (
  spot_type = SpotTypes.BLACKSPOT,
  status = SpotStatusTypes.ONDERZOEK,
  jaar_oplevering = null,
  jaar_blackspotlijst = null,
  jaar_ongeval_quickscan = null
) => {
  return {
    _icon: {
      style: { visibility: 'unset' },
    },
    feature: {
      properties: {
        spot_type,
        status,
        jaar_oplevering,
        jaar_blackspotlijst,
        jaar_ongeval_quickscan,
      },
    },
  };
};
