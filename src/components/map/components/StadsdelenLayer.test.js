import { render } from '@testing-library/react';
import { withTheme } from 'test/utils';
import { spy } from '@amsterdam/react-maps';

import StadsdelenLayer from './StadsdelenLayer';

jest.mock('@amsterdam/react-maps', () => {
  const addLayerSpy = jest.fn();

  return {
    __esModule: true,
    useMapInstance: () => ({
      addLayer: addLayerSpy,
    }),
    spy: addLayerSpy,
    default: () => <></>,
  };
});

describe('StadsdelenLayer', () => {
  it('enter search term and click on autosuggest item', () => {
    render(withTheme(<StadsdelenLayer />));
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
