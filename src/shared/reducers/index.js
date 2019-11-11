import locationReducer, {
  actions as LocationActions,
  initialState as initialLocationState,
  REDUCER_KEY as LOCATION,
} from './location';

const mainReducer = ({ location }, action) => ({
  [LOCATION]: locationReducer(location, action),
});

export const initialState = {
  [LOCATION]: initialLocationState,
};

const actions = {
  [LOCATION]: LocationActions,
};

/**
 * Returns an object with available actions for the specific reducer
 * @param dispatch
 * @param reducerKey
 * @returns {{}}
 */
export const actionsCreator = (dispatch, reducerKey) =>
  Object.entries(actions[reducerKey]).reduce(
    (acc, [action, constant]) => ({
      ...acc,
      [action]: args => dispatch({ type: constant, ...args }),
    }),
    {}
  );

export default mainReducer;
