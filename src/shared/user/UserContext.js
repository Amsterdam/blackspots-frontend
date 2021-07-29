import PropTypes from 'prop-types';
import { createContext } from 'react';

const initialState = {
  authenticated: false,
  canAdd: false,
  canEdit: false,
};

const UserContext = createContext(initialState);

export const UserContextProvider = ({ user, children }) => {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

UserContextProvider.propTypes = {
  user: PropTypes.shape({}),
  children: PropTypes.node,
};

export default UserContext;
