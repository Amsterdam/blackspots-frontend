/* eslint-disable no-case-declarations */
export const REDUCER_KEY = 'filter';
export const SELECT_LOCATION = `${REDUCER_KEY}/SELECT_LOCATION`;
export const SET_LOCATIONS = `${REDUCER_KEY}/SET_LOCATIONS`;
export const SET_FILTER = `${REDUCER_KEY}/SET_FILTER`;
export const UPDATE_LOCATION = `${REDUCER_KEY}/UPDATE_LOCATION`;
export const ADD_LOCATION = `${REDUCER_KEY}/ADD_LOCATION`;

export const initialState = {
  selectedLocation: null,
  locations: [],
  filter: {
    show: 'ALL',
    spotTypeFilter: {
      blackspot: false,
      'protocol dodelijk': false,
      'protocol ernstig': false,
      risico: false,
      wegvak: false,
    },
    spotStatusTypeFilter: {
      'onderzoek ontwerp': false,
      voorbereiding: false,
      gereed: false,
      'geen maatregel': false,
      uitvoering: false,
      undefined: false,
    },
    blackspotYearFilter: {
      '2014': false,
      '2015': false,
      '2016': false,
      '2017': false,
      '2018': false,
      '2019': false,
      '2020': false,
    },
    deliveredYearFilter: {
      '2015': false,
      '2016': false,
      '2017': false,
      '2018': false,
      '2019': false,
      '2020': false,
    },
    quickscanYearFilter: {
      '2013': false,
      '2014': false,
      '2015': false,
      '2016': false,
      '2017': false,
      '2018': false,
      '2019': false,
      '2020': false,
    },
    stadsdeelFilter: {
      Centrum: false,
      'Nieuw West': false,
      Noord: false,
      Oost: false,
      West: false,
      Westpoort: false,
      Zuid: false,
      Zuidoost: false,
    },
  },
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_LOCATION:
      return {
        ...state,
        selectedLocation: action.payload,
      };
    case SET_LOCATIONS:
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
    case UPDATE_LOCATION:
      return {
        ...state,
        locations: [
          ...state.locations.map(location => {
            return location.id === action.payload.id
              ? action.payload
              : location;
          }),
        ],
      };
    case ADD_LOCATION:
      return {
        ...state,
        locations: [...state.locations, action.payload],
      };
    default:
      return state;
  }
};

export const actions = {
  selectLocation: payload => ({ type: SELECT_LOCATION, payload }),
  setLocations: payload => ({ type: SET_LOCATIONS, payload }),
  setFilter: payload => ({ type: SET_FILTER, payload }),
  updateLocation: payload => ({ type: UPDATE_LOCATION, payload }),
  addLocation: payload => ({ type: ADD_LOCATION, payload }),
};

export default filterReducer;
