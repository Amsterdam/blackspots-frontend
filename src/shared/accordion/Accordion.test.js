import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { withTheme } from 'test/utils';

import Accordion from './Accordion';

describe('Accordion', () => {
  afterEach(cleanup);

  it('should render correctly', () => {
    const props = { title: 'Accordion titel', text: 'Hele lange tekst' };
    const { queryByText } = render(withTheme(<Accordion {...props} />));

    expect(queryByText(props.title)).toBeInTheDocument();
    expect(queryByText(props.text)).toBeInTheDocument();
  });
});
