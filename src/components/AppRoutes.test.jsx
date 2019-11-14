import React from 'react';

import { render } from '@testing-library/react';
import AppRoutes from './AppRoutes';
import { withUserContext } from 'test/utils';
import DashboardPage from 'views/dashboard/DashboardPage';
import ConceptPage from 'views/concepts/ConceptPage';
import ContactPage from 'views/contact/ContactPage';
import LocationPage from 'views/location/LocationPage';

jest.mock('views/dashboard/DashboardPage');
jest.mock('views/concepts/ConceptPage');
jest.mock('views/contact/ContactPage');
jest.mock('views/location/LocationPage');

describe('AppRoutes', () => {
  beforeEach(() => {
    DashboardPage.mockReturnValue(<div>dashboard</div>);
    ConceptPage.mockReturnValue(<div>concept</div>);
    ContactPage.mockReturnValue(<div>contact</div>);
    LocationPage.mockReturnValue(<div>location</div>);
  });

  it('should render the dashboard ', () => {
    var user = { canAdd: true };
    const { queryByText } = render(
      withUserContext(<AppRoutes></AppRoutes>, user)
    );
    expect(queryByText('dashboard')).not.toBeNull();
  });

  it('should render the location page when authorized ', () => {
    var user = { canAdd: true };
    const { queryByText } = render(
      withUserContext(<AppRoutes></AppRoutes>, user, '/add')
    );
    expect(queryByText('location')).not.toBeNull();
  });

  it('should navigate home when not authorized to add ', () => {
    var user = { canAdd: false };
    const { queryByText } = render(
      withUserContext(<AppRoutes></AppRoutes>, user, '/add')
    );
    expect(queryByText('location')).toBeNull();
    expect(queryByText('dashboard')).not.toBeNull();
  });
});
