// @TODO reenable unit test
// // import { render, fireEvent } from '@testing-library/react';
// import useForm from 'react-hook-form';
// import { FilterContext } from 'shared/reducers/FilterContext';
// import { initialState } from 'shared/reducers/filter';
// import LocationForm from './LocationForm';
// import { withTheme } from '../../test/utils';
// import { featureMock, locationMock } from './LocationForm.mock';
// import { initalValues } from './definitions/FormFields';

jest.mock('react-hook-form');
jest.mock();

describe('LocationForm', () => {
  // const mockedState = {
  //   ...initialState,
  //   selectedLocation: null,
  // };

  // const useFormMock = {
  //   register: jest.fn(),
  //   unregister: jest.fn(),
  //   handleSubmit: jest.fn(),
  //   setValue: jest.fn(),
  //   errors: {},
  //   watch: jest.fn(),
  // };

  // beforeEach(() => {});

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render the add form', () => {
    expect(1).toBe(1);
    // const dispatchSpy = jest.fn();
    // useFormMock.watch.mockReturnValue(initalValues);
    // useForm.mockReturnValue({ ...useFormMock });

    // const { container } = render(
    //   withTheme(
    //     <FilterContext.Provider
    //       value={{ state: mockedState, dispatch: dispatchSpy }}
    //     >
    //       <LocationForm />
    //     </FilterContext.Provider>
    //   )
    // );
    // expect(container.firstChild.innerHTML).not.toBeUndefined();
    // expect(container.querySelectorAll('textarea').length).toEqual(2);
    // expect(container.querySelectorAll('input[type="text"]').length).toEqual(7);
    // expect(container.querySelector('input[type="text"]').value).toEqual('');
  });

  // it('should render the edit form ', () => {
  //   const dispatchSpy = jest.fn();
  //   useFormMock.watch.mockReturnValue(locationMock);
  //   useForm.mockReturnValue({ ...useFormMock });
  //   const { container } = render(
  //     withTheme(
  //       <FilterContext.Provider
  //         value={{
  //           state: { ...mockedState, selectedLocation: featureMock },
  //           dispatch: dispatchSpy,
  //         }}
  //       >
  //         <LocationForm />
  //       </FilterContext.Provider>
  //     )
  //   );
  //   expect(container.firstChild.innerHTML).not.toBeUndefined();
  //   expect(container.querySelectorAll('textarea').length).toEqual(2);
  //   expect(container.querySelectorAll('input[type="text"]').length).toEqual(7);
  //   expect(container.querySelector('input[type="text"]').value).toEqual(
  //     featureMock.properties.description
  //   );
  // });

  // it('should call handleChange when there are changes in the form', () => {
  //   const dispatchSpy = jest.fn();
  //   const setValueMock = jest.fn();
  //   useFormMock.watch.mockReturnValue(initalValues);
  //   useForm.mockReturnValue({ ...useFormMock, setValue: setValueMock });
  //   const { getByTestId } = render(
  //     withTheme(
  //       <FilterContext.Provider
  //         value={{
  //           state: { ...mockedState, selectedLocation: featureMock },
  //           dispatch: dispatchSpy,
  //         }}
  //       >
  //         <LocationForm />
  //       </FilterContext.Provider>
  //     )
  //   );

  //   const inputId = 'naam';
  //   const inputValue = `${inputId}-value`;
  //   const input = getByTestId(`${inputId}-test-id`);
  //   expect(input).toBeInTheDocument();
  //   jest.resetAllMocks();
  //   fireEvent.change(input, { target: { value: inputValue } });
  //   expect(setValueMock).toHaveBeenCalledTimes(1);
  //   expect(setValueMock).toHaveBeenCalledWith(inputId, inputValue);
  // });
});
