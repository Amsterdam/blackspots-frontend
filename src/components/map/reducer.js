export const initialState = {
  layerRef: 'foo',
  geoLayerRef: 'bar',
  setLocation: undefined,
  locations: [],
};

export default (state, action) => {
  switch (action.type) {
    // case RESET_LOCATION:
    //   return {
    //     ...state,
    //     location: initialState.location,
    //   };

    // case SET_LOCATION:
    //   return {
    //     ...state,
    //     location: action.payload,
    //   };

    // case SET_ADDRESS:
    //   return {
    //     ...state,
    //     addressText: action.payload,
    //   };

    // case SET_VALUES:
    //   return {
    //     ...state,
    //     ...action.payload,
    //   };

    // case SET_LOADING:
    //   return {
    //     ...state,
    //     loading: action.payload,
    //   };

    default:
      return state;
  }
};
