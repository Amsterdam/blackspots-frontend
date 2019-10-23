import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Header from './Header';
import { withUserContext } from 'test/utils';

describe('Header', () => {
  const regex = /toevoegen/i;

  afterEach(cleanup);

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
