import React from 'react';
import { render } from '@testing-library/react';
import { withUserContext, history } from 'test/utils';
import DashboardPage from 'views/dashboard/DashboardPage';
import ConceptPage from 'views/concepts/ConceptPage';
import ContactPage from 'views/contact/ContactPage';
import LocationPage from 'views/location/LocationPage';
import AppRoutes from './AppRoutes';

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
    const user = { canAdd: true };
    const { queryByText } = render(withUserContext(<AppRoutes />, user));
    expect(queryByText('dashboard')).not.toBeNull();
  });

  it('should render the location page when authorized ', () => {
    const user = { canAdd: true };
    history.push('/add');
    const { queryByText } = render(withUserContext(<AppRoutes />, user));
    expect(queryByText('location')).not.toBeNull();
  });

  it('should navigate home when not authorized to add ', () => {
    const user = { canAdd: false };
    history.push('/add');
    const { queryByText } = render(withUserContext(<AppRoutes />, user));
    expect(queryByText('location')).toBeNull();
    expect(queryByText('dashboard')).not.toBeNull();
  });
});
