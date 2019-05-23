import React from 'react';
import { shallow } from 'enzyme';

import DashboardPage from './DashboardPage';
import * as api from 'services/geo-api';
import auth from 'shared/auth/auth';
describe('DashboardPage', () => {
  auth.default = jest.fn();
  api.getAllBlackSpots = jest.fn();
  delete window.Keycloak;
  window.Keycloak = jest.fn();
  it('should render without errors', () => {
    // jest.spyOn(api, 'getAllBlackSpots');
    // jest.mock('services/geo-api.js');
    // window = { Keycloak: () => {} };
    shallow(<DashboardPage />);
  });
});
