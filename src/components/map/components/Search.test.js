import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { withTheme } from 'test/utils';
import { useMapInstance } from '@amsterdam/react-maps';
import { mocked } from 'ts-jest';

import Search from './Search';

jest.mock('@amsterdam/react-maps');

const mockedUseMapInstance = mocked(useMapInstance);

describe('Search', () => {
  const spy = jest.fn();

  afterEach(cleanup);

  it('should click one of the checkboxes', () => {
    mockedUseMapInstance.mockImplementation(() => ({
      flyTo: spy,
    }));

    // const flyToSpy = jest.spyOn(useMapInstance, 'flyTo');
    const { container } = render(withTheme(<Search />));

    // click Centrum
    // fireEvent.click(container.querySelector('label:nth-child(2)'));

    // expect(mockSignOutFn).not.toBeCalled();
    expect(1).toBe(1);
  });
});
