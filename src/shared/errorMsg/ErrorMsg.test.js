import { render, cleanup } from '@testing-library/react';
import { withTheme } from 'test/utils';

import ErrorMsg from './ErrorMsg';

describe('ErrorMsg', () => {
  afterEach(cleanup);

  it('should render correctly', () => {
    const props = { isOpen: true };
    const { queryByText } = render(withTheme(<ErrorMsg {...props} />));

    expect(
      queryByText('Informatie op de kaart kan niet worden geladen.')
    ).toBeInTheDocument();
  });
});
