import React from 'react';
import auth from 'shared/auth/auth';

export default () => {
  function login() {
    auth.keycloak.login();
  }
  return (
    <div>
      Landing page<button onClick={login}>Login</button>
    </div>
  );
};
