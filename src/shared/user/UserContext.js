import React from 'react';

const UserContext = React.createContext({ authenticated: false, roles: [] });

export default UserContext;
