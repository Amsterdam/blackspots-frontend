import { render } from '@testing-library/react';
import { withUserContext, history } from 'test/utils';
import DashboardPage from 'views/dashboard/DashboardPage';
import ConceptPage from 'views/concepts/ConceptPage';
import ContactPage from 'views/contact/ContactPage';
import LocationForm from 'components/locationForm/LocationForm';
import AppRoutes from './AppRoutes';

jest.mock('views/dashboard/DashboardPage');
jest.mock('views/concepts/ConceptPage');
jest.mock('views/contact/ContactPage');
jest.mock('components/locationForm/LocationForm');

describe('AppRoutes', () => {
  beforeEach(() => {
    DashboardPage.mockReturnValue(<div>dashboard</div>);
    ConceptPage.mockReturnValue(<div>concept</div>);
    ContactPage.mockReturnValue(<div>contact</div>);
    LocationForm.mockReturnValue(<div>location</div>);
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

  // @TODO fix failing unit test
  //
  // it('should navigate home when not authorized to add ', () => {
  //   const user = { canAdd: false };
  //   history.push('/add');
  //   const { queryByText } = render(withUserContext(<AppRoutes />, user));
  //   expect(queryByText('location')).toBeNull();
  //   expect(queryByText('dashboard')).not.toBeNull();
  // });
});
