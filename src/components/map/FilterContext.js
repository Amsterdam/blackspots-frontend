import React from 'react';

const initialState = {
  // locations: [],
  // selectedLocation: {},

  layerRef: 'foo',
  geoLayerRef: undefined,
  setLocation: undefined,
};

const FilterContext = React.createContext(initialState);

export const FilterContextProvider = ({ filter, children }) => {
  return (
    <FilterContext.Provider value={filter}>{children}</FilterContext.Provider>
  );
};

export default FilterContext;
