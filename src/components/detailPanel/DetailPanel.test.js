import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { withUserContext } from 'test/utils';

import DetailPanel from './DetailPanel';
import SVGIcon from '../SVGIcon/SVGIcon';
jest.mock('../SVGIcon/SVGIcon');

describe('DetailPanel', () => {
  const featureMock = {
    id: 83,
    geometry: {
      coordinates: [4.8808235, 52.3810869],
    },
    properties: {
      stadsdeel: 'Centrum',
      documents: [],
      locatie_id: 'B165_19',
      description:
        'Eerste Marnixplantsoen - Lijnbaansgracht - Marnixstraat - Nw Willemsstraat',
    },
  };

  const props = {
    isOpen: true,
    togglePanel: jest.fn(),
    feature: featureMock,
  };

  beforeEach(() => {
    SVGIcon.mockReturnValue(<span>icon</span>);
  });

  afterEach(cleanup);

  it('should not be visible when the feature is empty', () => {
    var user = { canEdit: true };
    const { container } = render(
      withUserContext(<DetailPanel {...{ ...props, feature: null }} />, user)
    );
    expect(container.firstChild.innerHTML).toBe('');
  });

  it('should render the edit link when authorized ', () => {
    var user = { canEdit: true };
    const { queryByText } = render(
      withUserContext(<DetailPanel {...props} />, user)
    );
    expect(queryByText(/Wijzig/)).not.toBeNull();
  });

  it('should NOT render the edit link when not authorized for edit ', () => {
    var user = { canEdit: false };
    const { queryByText } = render(
      withUserContext(<DetailPanel {...props} />, user)
    );
    expect(queryByText(/Wijzig/)).toBeNull();
  });
});
