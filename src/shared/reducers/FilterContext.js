import PropTypes from 'prop-types';
import { useReducer, createContext } from 'react';
import filterReducer, { initialState } from './filter';

export const FilterContext = createContext(initialState);

const FilterContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(filterReducer, initialState);

  return (
    <FilterContext.Provider value={{ state, dispatch }}>
      {children}
    </FilterContext.Provider>
  );
};

FilterContextProvider.propTypes = {
  children: PropTypes.element,
};

export default FilterContextProvider;
