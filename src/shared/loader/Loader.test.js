import { render, cleanup } from '@testing-library/react';
import { withTheme } from 'test/utils';

import Loader from './Loader';

describe('Loader', () => {
  afterEach(cleanup);

  it('should render correctly', () => {
    const { queryByText } = render(withTheme(<Loader />));

    expect(queryByText('Bezig met laden...')).toBeInTheDocument();
  });
});
