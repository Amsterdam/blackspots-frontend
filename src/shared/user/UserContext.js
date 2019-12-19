import React from 'react';

const initialState = {
  authenticated: false,
  canAdd: false,
  canEdit: false,
};

const UserContext = React.createContext(initialState);

export const UserContextProvider = ({ user, children }) => {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserContext;
