import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import useAppReducer from 'shared/hooks/useAppReducer';
import useForm from 'react-hook-form';
import LocationForm from './LocationForm';
import { withTheme } from '../../test/utils';
import { mockFeature } from './LocationForm.mock';

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
    expect(container.querySelector('input[type="text"]').value).toEqual('');
  });

  it('should render the edit form ', () => {
    useAppReducer.mockReturnValue([{ selectedLocation: mockFeature }]);
    useForm.mockReturnValue({
      register: jest.fn(),
      handleSubmit: jest.fn(),
      setValue: jest.fn(),
    });
    const { container } = render(withTheme(<LocationForm id={'1'} />));
    expect(container.firstChild.innerHTML).not.toBeUndefined();
    expect(container.querySelectorAll('textarea').length).toEqual(2);
    expect(container.querySelectorAll('input[type="text"]').length).toEqual(8);
    expect(container.querySelector('input[type="text"]').value).toEqual(
      mockFeature.properties.description
    );
  });

  it('should call handleChange when there are changes in the form', () => {
    const setValueMock = jest.fn();
    useAppReducer.mockReturnValue([{ selectedLocation: null }]);
    useForm.mockReturnValue({
      register: jest.fn(),
      handleSubmit: jest.fn(),
      setValue: setValueMock,
    });
    const { getByTestId } = render(withTheme(<LocationForm id={''} />));

    const inputId = 'naam';
    const inputValue = `${inputId}-value`;
    const input = getByTestId(`${inputId}-test-id`);
    expect(input).toBeInTheDocument();
    fireEvent.change(input, { target: { value: inputValue } });
    expect(setValueMock).toHaveBeenCalledTimes(1);
    expect(setValueMock).toHaveBeenCalledWith(inputId, inputValue);
  });

  it('should call on submit when the form is submitted', () => {});
});
