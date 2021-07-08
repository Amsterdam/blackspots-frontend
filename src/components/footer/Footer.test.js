import { render, cleanup } from '@testing-library/react';
import { withTheme } from 'test/utils';

import Footer from './Footer';

describe('Footer', () => {
  afterEach(cleanup);

  it('should render correctly', () => {
    const { queryByText } = render(withTheme(<Footer />));

    expect(queryByText('Disclaimer')).toBeInTheDocument();
  });
});
