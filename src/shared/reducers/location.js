/* eslint-disable no-case-declarations */
export const REDUCER_KEY = 'location';
export const SELECT_LOCATION = `${REDUCER_KEY}/SELECT_LOCATION`;
export const ADD_LOCATIONS = `${REDUCER_KEY}/ADD_LOCATIONS`;
export const UPDATE_LOCATION = `${REDUCER_KEY}/UPDATE_LOCATION`;

export const initialState = {
  selectedLocation: null,
  locations: [],
};

const locationReducer = (state = initialState, action) => {
  console.log('locationReducer', action.type, action.payload);
  switch (action.type) {
    // Increase or decrease the number of times the backdrop is triggered.
    // We do this so other triggers of show / hide backdrops won't overrule others while the
    // backdrop is active
    case SELECT_LOCATION:
      return {
        ...state,
        selectedLocation: { ...action.payload },
      };
    case ADD_LOCATIONS:
      return {
        ...state,
        locations: [...action.payload],
      };
    case UPDATE_LOCATION:
      return {
        ...state,
        locations: [
          ...state.locations.filter(
            location => location.id !== action.payload.id
          ),
          action.payload,
        ],
        selectedLocation: { ...action.payload },
      };
    default:
      return state;
  }
};

export const actions = {
  selectLocation: SELECT_LOCATION,
  addLocations: ADD_LOCATIONS,
  updateLocation: UPDATE_LOCATION,
};

export default locationReducer;
