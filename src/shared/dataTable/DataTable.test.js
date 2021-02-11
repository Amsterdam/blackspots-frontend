import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { withTheme } from 'test/utils';

import DataTable from './DataTable';

describe('ContentBox', () => {
  afterEach(cleanup);

  it('should render correctly', () => {
    const { queryByText } = render(withTheme(<DataTable>children</DataTable>));

    expect(queryByText('children')).toBeInTheDocument();
  });
});
