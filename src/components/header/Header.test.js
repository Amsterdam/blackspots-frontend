import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { UserContextProvider } from 'shared/user/UserContext';
import Header from './Header';

const history = createMemoryHistory();

describe('Header', () => {
  const regex = /toevoegen/i;
  const withUserContext = (Component, user) => (
    <UserContextProvider user={user}>
      <Router history={history}>{Component}</Router>
    </UserContextProvider>
  );

  afterEach(() => {
    cleanup();
  });

  it('should not render the add link when the user has no add rights', () => {
    var user = { canAdd: false };
    const { container, queryByText } = render(
      withUserContext(<Header />, user)
    );
    expect(queryByText(regex)).toBeNull();
    expect(container.querySelectorAll('.Link')).toHaveLength(3);
  });

  it('should render the add link when the user has add rights', () => {
    var user = { canAdd: true };
    const { container, queryByText } = render(
      withUserContext(<Header />, user)
    );
    expect(queryByText(regex)).not.toBeNull();
    expect(container.querySelectorAll('.Link')).toHaveLength(4);
  });
});
