import { render, cleanup } from '@testing-library/react';
import { withTheme } from 'test/utils';

import ContactPage from './ContactPage';

describe('ContactPage', () => {
  afterEach(cleanup);

  it('should render correctly', () => {
    const { queryByText } = render(withTheme(<ContactPage />));

    expect(queryByText('Contact')).toBeInTheDocument();
    expect(queryByText('Terug naar kaart')).toBeInTheDocument();
  });
});
