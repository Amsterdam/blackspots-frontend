import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { withTheme } from 'test/utils';
import { useMapInstance } from '@amsterdam/react-maps';
import { mocked } from 'ts-jest/utils';

import StadsdelenLayer from './StadsdelenLayer';

jest.mock('@amsterdam/react-maps');

const mockedUseMapInstance = mocked(useMapInstance);

describe('StadsdelenLayer', () => {
  const addLayerSpy = jest.fn();

  beforeEach(() => {
    mockedUseMapInstance.mockImplementation(() => ({
      addLayer: addLayerSpy,
    }));
  });

  afterEach(cleanup);

  it('enter search term and click on autosuggest item', () => {
    render(withTheme(<StadsdelenLayer />));
    expect(addLayerSpy).toHaveBeenCalledTimes(1);
  });
});
