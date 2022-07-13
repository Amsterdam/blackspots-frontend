import { render, cleanup, screen } from '@testing-library/react';
import { withTheme } from 'test/utils';

import App from './App';

describe('App', () => {
  afterEach(cleanup);

  it('should render correctly', async () => {
    const { queryByTestId } = render(withTheme(<App />));

    await screen.findByText('Werkgroep Blackspots');

    expect(queryByTestId('app')).toBeInTheDocument();
  });
});
