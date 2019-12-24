import auth from './auth';

describe('auth', () => {
  let keycloakMock;

  beforeEach(() => {
    keycloakMock = auth.instance();
  });

  it('should login', async () => {
    keycloakMock.login = jest.fn();
    await auth.login();
    expect(keycloakMock.login).toHaveBeenCalled();
  });

  it('should logout', async () => {
    keycloakMock.logout = jest.fn();
    await auth.logout();
    expect(keycloakMock.logout).toHaveBeenCalled();
  });

  it('should not call loadUserInfo when not authenticated', async () => {
    keycloakMock.loadUserInfo = jest.fn();
    keycloakMock.authenticated = false;
    await auth.userInfo();
    expect(keycloakMock.loadUserInfo).not.toHaveBeenCalled();
  });

  it('should call loadUserInfo when authenticated', async () => {
    keycloakMock.loadUserInfo = jest.fn();
    keycloakMock.authenticated = true;
    await auth.userInfo();
    expect(keycloakMock.loadUserInfo).toHaveBeenCalled();
  });
});
