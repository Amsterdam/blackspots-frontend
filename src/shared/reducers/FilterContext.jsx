import { node } from 'prop-types';
import { useReducer, createContext, useContext } from 'react';
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
  children: node,
};

export default FilterContextProvider;

export function useFilterStateValue() {
  const {
    state: { filter },
  } = useContext(FilterContext);

  return filter;
}

export function useDispatch() {
  const { dispatch } = useContext(FilterContext);

  return dispatch;
}
