/* eslint-disable no-case-declarations */
export const REDUCER_KEY = 'filter';
export const SELECT_LOCATION = `${REDUCER_KEY}/SELECT_LOCATION`;
export const ADD_LOCATIONS = `${REDUCER_KEY}/ADD_LOCATIONS`;
export const SET_FILTER = `${REDUCER_KEY}/SET_FILTER`;

export const initialState = {
  test: 'foo',
  selectedLocation: null,
  locations: [],
  filter: {},
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
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
  selectLocation: SELECT_LOCATION,
  addLocations: ADD_LOCATIONS,
  setFilter: SET_FILTER,
};

export default filterReducer;
