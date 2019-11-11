import React from 'react';

import { render } from '@testing-library/react';
import AppRoutes from './AppRoutes';
import { withUserContext } from 'test/utils';
import DashboardPage from 'views/dashboard/DashboardPage';
import ConceptPage from 'views/concepts/ConceptPage';
import ContactPage from 'views/contact/ContactPage';
import ManageLocationPage from 'views/manage/ManageLocationPage';

jest.mock('views/dashboard/DashboardPage');
jest.mock('views/concepts/ConceptPage');
jest.mock('views/contact/ContactPage');
jest.mock('views/manage/ManageLocationPage');

describe('AppRoutes', () => {
  beforeEach(() => {
    DashboardPage.mockReturnValue(<div>dashboard</div>);
    ConceptPage.mockReturnValue(<div>concept</div>);
    ContactPage.mockReturnValue(<div>contact</div>);
    ManageLocationPage.mockReturnValue(<div>manage</div>);
  });

  it('should render the dashboard ', () => {
    var user = { canAdd: true };
    const { queryByText } = render(
      withUserContext(<AppRoutes></AppRoutes>, user)
    );
    expect(queryByText('dashboard')).not.toBeNull();
  });

  it('should render the manage page when authorized ', () => {
    var user = { canAdd: true };
    const { queryByText } = render(
      withUserContext(<AppRoutes></AppRoutes>, user, '/add')
    );
    expect(queryByText('manage')).not.toBeNull();
  });

  it('should navigate home when not authorized to add ', () => {
    var user = { canAdd: false };
    const { queryByText } = render(
      withUserContext(<AppRoutes></AppRoutes>, user, '/add')
    );
    expect(queryByText('manage')).toBeNull();
    expect(queryByText('dashboard')).not.toBeNull();
  });
});
