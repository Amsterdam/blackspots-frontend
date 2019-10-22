import React from 'react';

const UserContext = React.createContext({ authenticated: false, roles: [] });

export const UserContextProvider = ({ user, children }) => {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserContext;
