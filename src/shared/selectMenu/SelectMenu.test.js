import React from 'react';
import { shallow } from 'enzyme';

import SelectMenu from './SelectMenu';

describe('SelectMenu', () => {
  it('should render without errors', () => {
    shallow(
      <SelectMenu
        items={[{ id: 1, label: 'test', value: 'test-value' }]}
        selectionChanged={jest.fn()}
        defaultValue="test-value"
      />
    );
  });
});
