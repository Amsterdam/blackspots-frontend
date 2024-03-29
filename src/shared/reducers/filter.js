export const REDUCER_KEY = 'filter';
export const SELECT_LOCATION = `${REDUCER_KEY}/SELECT_LOCATION`;
export const SET_LOCATIONS = `${REDUCER_KEY}/SET_LOCATIONS`;
export const SET_FILTER = `${REDUCER_KEY}/SET_FILTER`;
export const UPDATE_LOCATION = `${REDUCER_KEY}/UPDATE_LOCATION`;
export const ADD_LOCATION = `${REDUCER_KEY}/ADD_LOCATION`;

function getYears(start) {
  const currentYear = new Date().getFullYear();
  const result = {};

  for (let y = start; y <= currentYear; y++) {
    result[`${y}`] = false;
  }

  return result;
}

const blackspotYears = getYears(2014);
const deliveredYears = getYears(2015);
const quickscanYears = getYears(2013);
const ivmYears = getYears(2015);

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
    blackspotYearFilter: blackspotYears,
    deliveredYearFilter: deliveredYears,
    quickscanYearFilter: quickscanYears,
    ivmYearFilter: ivmYears,
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
        locations: state.locations.map((location) => {
          return location.id === action.payload.id ? action.payload : location;
        }),
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
  selectLocation: (payload) => ({ type: SELECT_LOCATION, payload }),
  setLocations: (payload) => ({ type: SET_LOCATIONS, payload }),
  setFilter: (payload) => ({ type: SET_FILTER, payload }),
  updateLocation: (payload) => ({ type: UPDATE_LOCATION, payload }),
  addLocation: (payload) => ({ type: ADD_LOCATION, payload }),
};

export default filterReducer;
