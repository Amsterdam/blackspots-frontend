import React, { useReducer } from 'react';
import reducer, { initialState } from './reducer';

const Context = React.createContext(initialState);

const FilterContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export default FilterContext;
