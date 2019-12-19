import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import useAppReducer from 'shared/hooks/useAppReducer';
import useForm from 'react-hook-form';
import LocationForm from './LocationForm';
import { withTheme } from '../../test/utils';
import { featureMock, locationMock } from './LocationForm.mock';
import { initalValues } from './definitions/FormFields';

jest.mock('shared/hooks/useAppReducer');
jest.mock('react-hook-form');

describe('LocationForm', () => {
  const useFormMock = {
    register: jest.fn(),
    unregister: jest.fn(),
    handleSubmit: jest.fn(),
    setValue: jest.fn(),
    errors: {},
    watch: jest.fn(),
  };

  beforeEach(() => {});

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render the add form ', () => {
    useAppReducer.mockReturnValue([{ selectedLocation: null }]);
    useFormMock.watch.mockReturnValue(initalValues);
    useForm.mockReturnValue({ ...useFormMock });
    const { container } = render(withTheme(<LocationForm id="" />));
    expect(container.firstChild.innerHTML).not.toBeUndefined();
    expect(container.querySelectorAll('textarea').length).toEqual(2);
    expect(container.querySelectorAll('input[type="text"]').length).toEqual(7);
    expect(container.querySelector('input[type="text"]').value).toEqual('');
  });

  it('should render the edit form ', () => {
    useAppReducer.mockReturnValue([{ selectedLocation: featureMock }]);
    useFormMock.watch.mockReturnValue(locationMock);
    useForm.mockReturnValue({ ...useFormMock });
    const { container } = render(withTheme(<LocationForm id="1" />));
    expect(container.firstChild.innerHTML).not.toBeUndefined();
    expect(container.querySelectorAll('textarea').length).toEqual(2);
    expect(container.querySelectorAll('input[type="text"]').length).toEqual(7);
    expect(container.querySelector('input[type="text"]').value).toEqual(
      featureMock.properties.description
    );
  });

  it('should call handleChange when there are changes in the form', () => {
    const setValueMock = jest.fn();
    useAppReducer.mockReturnValue([{ selectedLocation: null }]);
    useFormMock.watch.mockReturnValue(initalValues);
    useForm.mockReturnValue({ ...useFormMock, setValue: setValueMock });
    const { getByTestId } = render(withTheme(<LocationForm id="" />));

    const inputId = 'naam';
    const inputValue = `${inputId}-value`;
    const input = getByTestId(`${inputId}-test-id`);
    expect(input).toBeInTheDocument();
    jest.resetAllMocks();
    fireEvent.change(input, { target: { value: inputValue } });
    expect(setValueMock).toHaveBeenCalledTimes(1);
    expect(setValueMock).toHaveBeenCalledWith(inputId, inputValue);
  });

  it('should call on submit when the form is submitted', () => {});
});
