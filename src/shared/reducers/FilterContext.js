import React, { useReducer } from 'react';
import filterReducer, { initialState } from './filter';

const Context = React.createContext(initialState);

const FilterContext = ({ children }) => {
  const [state, dispatch] = useReducer(filterReducer, initialState);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export default FilterContext;
