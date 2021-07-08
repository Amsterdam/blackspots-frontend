import { render, cleanup } from '@testing-library/react';
import { withTheme } from 'test/utils';

import ConceptPage from './ConceptPage';

describe('ConceptPage', () => {
  afterEach(cleanup);

  it('should render correctly', () => {
    const { queryByText } = render(withTheme(<ConceptPage />));

    expect(queryByText('Begrippenlijst')).toBeInTheDocument();
    expect(queryByText('Terug naar kaart')).toBeInTheDocument();
  });
});
