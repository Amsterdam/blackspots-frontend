import { render } from '@testing-library/react';
import { withUserContext } from 'test/utils';
import Header from './Header';

describe('Header', () => {
  const regex = /toevoegen/i;

  it('should not render the add link when the user has no add rights', () => {
    const user = { canAdd: false };
    const { container, queryByText } = render(
      withUserContext(<Header />, user)
    );

    expect(queryByText(regex)).toBeNull();
    expect(container.querySelectorAll('nav a')).toHaveLength(3);
  });

  it('should render the add link when the user has add rights', () => {
    const user = { canAdd: true };
    const { container, queryByText } = render(
      withUserContext(<Header />, user)
    );
    expect(queryByText(regex)).not.toBeNull();
    expect(container.querySelectorAll('nav a')).toHaveLength(4);
  });
});
