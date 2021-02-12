import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { withTheme } from 'test/utils';

import DataTable from './DataTable';

describe('DataTable', () => {
  afterEach(cleanup);

  it('should render correctly', () => {
    const { queryByText } = render(
      withTheme(
        <DataTable>
          <tbody>
            <tr>
              <td>foo</td>
              <td>bar</td>
            </tr>
          </tbody>
        </DataTable>
      )
    );

    expect(queryByText('foo')).toBeInTheDocument();
    expect(queryByText('bar')).toBeInTheDocument();
  });
});
