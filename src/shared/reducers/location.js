/* eslint-disable no-case-declarations */
export const REDUCER_KEY = 'location';
export const SELECT_LOCATION = `${REDUCER_KEY}/SELECT_LOCATION`;

export const initialState = {
  selectedLocation: null,
};

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    // Increase or decrease the number of times the backdrop is triggered.
    // We do this so other triggers of show / hide backdrops won't overrule others while the
    // backdrop is active
    case SELECT_LOCATION:
      return {
        ...state,
        selectedLocation: { ...action.payload },
      };
    default:
      return state;
  }
};

export const actions = {
  selectLocation: SELECT_LOCATION,
};

export default locationReducer;
