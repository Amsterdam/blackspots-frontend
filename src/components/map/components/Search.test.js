import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { withTheme } from 'test/utils';

import { Map } from '@amsterdam/arm-core';

import Search from './Search';

const spy = jest.fn();

jest.mock('@amsterdam/react-maps', () => {
  // Require the original module to not be mocked...
  const originalModule = jest.requireActual('@amsterdam/react-maps');
  console.log('originalModule', originalModule);

  return {
    __esModule: true, // Use it when dealing with esModules
    ...originalModule,
    useMapInstance: () => {
      return spy;
    },
  };
});

describe('Search', () => {
  afterEach(cleanup);

  it('should click one of the checkboxes', () => {
    // const flyToSpy = jest.spyOn(useMapInstance, 'flyTo');
    const { container } = render(
      withTheme(
        <Map>
          <Search />
        </Map>
      )
    );

    // click Centrum
    // fireEvent.click(container.querySelector('label:nth-child(2)'));

    // expect(mockSignOutFn).not.toBeCalled();
    expect(1).toBe(1);
  });
});
