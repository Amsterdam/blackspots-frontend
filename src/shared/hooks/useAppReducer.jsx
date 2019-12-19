import React, { createContext, useContext, useMemo, useReducer } from 'react';
import PropTypes from 'prop-types';
import { actionsCreator } from '../reducers';

export const AppStateContext = createContext();
export const AppStateProvider = ({ reducer, initialState, children }) => {
  const value = useReducer(reducer, initialState);

  const memoValue = useMemo(() => value, [value]);
  return (
    <AppStateContext.Provider value={memoValue}>
      {children}
    </AppStateContext.Provider>
  );
};

AppStateProvider.propTypes = {
  reducer: PropTypes.func.isRequired,
  initialState: PropTypes.shape({}).isRequired,
  children: PropTypes.node.isRequired,
};

const useAppReducer = (reducerKey, context) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [state, dispatch] = context || useContext(AppStateContext);

  return reducerKey
    ? [state[reducerKey], actionsCreator(dispatch, reducerKey)]
    : [state, dispatch];
};

export default useAppReducer;
