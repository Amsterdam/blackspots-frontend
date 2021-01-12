/* eslint-disable no-case-declarations */
export const REDUCER_KEY = 'filter';
export const SELECT_LOCATION = `${REDUCER_KEY}/SELECT_LOCATION`;
export const SET_LOCATIONS = `${REDUCER_KEY}/SET_LOCATIONS`;
export const SET_FILTER = `${REDUCER_KEY}/SET_FILTER`;

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
  console.log('filterReducer', action.type, action.payload);
  switch (action.type) {
    case SELECT_LOCATION:
      return {
        ...state,
        selectedLocation: { ...action.payload },
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
