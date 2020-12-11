/* eslint-disable no-case-declarations */
export const REDUCER_KEY = 'filter';
export const SELECT_LOCATION = `${REDUCER_KEY}/SELECT_LOCATION`;
export const SET_LOCATIONS = `${REDUCER_KEY}/SET_LOCATIONS`;
export const SET_FILTER = `${REDUCER_KEY}/SET_FILTER`;

export const initialState = {
  selectedLocation: null,
  locations: [],
  filter: {},
};

const filterReducer = (state = initialState, action) => {
  console.log('filterReducer', action.type, action.payload);
  switch (action.type) {
    case SELECT_LOCATION:
      return {
        ...state,
        selectedLocation: { ...action.payload },
      };
    case SET_LOCATIONS:
      return {
        locations: [...action.payload],
      };
    case SET_FILTER:
      return {
        ...state,
        filter: {
          ...state,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

export const actions = {
  selectLocation: payload => ({ type: SELECT_LOCATION, payload }),
  setLocations: payload => ({ type: SET_LOCATIONS, payload }),
  setFilter: payload => ({ type: SET_FILTER, payload }),
};

export default filterReducer;
