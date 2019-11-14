import React from 'react';
import { render, cleanup } from '@testing-library/react';
import useAppReducer from 'shared/hooks/useAppReducer';
import useForm from 'react-hook-form';
import LocationForm from './LocationForm';
import { withTheme } from '../../test/utils';

jest.mock('shared/hooks/useAppReducer');
jest.mock('react-hook-form');

describe('LocationForm', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render the add form ', () => {
    useAppReducer.mockReturnValue([{ selectedLocation: null }]);
    useForm.mockReturnValue({
      register: jest.fn(),
      handleSubmit: jest.fn(),
      setValue: jest.fn(),
    });
    const { container } = render(withTheme(<LocationForm id={''} />));
    expect(container.firstChild.innerHTML).not.toBeUndefined();
    expect(container.querySelectorAll('textarea').length).toEqual(2);
    expect(container.querySelectorAll('input[type="text"]').length).toEqual(8);
  });
});
