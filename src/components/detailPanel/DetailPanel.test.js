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

  const editButtonTestId = 'editButton';

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
    const user = { canEdit: true };
    const { container } = render(
      withUserContext(<DetailPanel {...{ ...props, feature: null }} />, user)
    );
    expect(container.firstChild.innerHTML).toBe('');
  });

  it('should render the edit link when authorized ', () => {
    const user = { canEdit: true };
    const { queryByTestId } = render(
      withUserContext(<DetailPanel {...props} />, user)
    );
    expect(queryByTestId(editButtonTestId)).not.toBeNull();
  });

  it('should NOT render the edit link when not authorized for edit ', () => {
    const user = { canEdit: false };
    const { queryByTestId } = render(
      withUserContext(<DetailPanel {...props} />, user)
    );
    expect(queryByTestId(editButtonTestId)).toBeNull();
  });

  it('should render the edit link when authorized ', () => {
    const user = { canEdit: true };
    const { queryByTestId } = render(
      withUserContext(<DetailPanel {...props} />, user)
    );
    expect(queryByTestId(editButtonTestId)).not.toBeNull();
  });

  it('should NOT render the edit link when not authorized for edit ', () => {
    const user = { canEdit: false };
    const { queryByTestId } = render(
      withUserContext(<DetailPanel {...props} />, user)
    );
    expect(queryByTestId(editButtonTestId)).toBeNull();
  });
});
