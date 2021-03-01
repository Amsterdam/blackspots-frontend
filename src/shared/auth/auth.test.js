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

  it('should return the token', async () => {
    keycloakMock.token = 'the-token';
    const token = await auth.token();
    expect(token).toEqual('Bearer the-token');
  });

  it('should check the roles', async () => {
    keycloakMock.realmAccess.roles.push('bs_w');
    const canAdd = await auth.canAdd();
    expect(canAdd).toBeTruthy();
    const canEdit = await auth.canEdit();
    expect(canEdit).toBeTruthy();
  });

  it('should check the authentication', async () => {
    keycloakMock.authenticated = true;
    const isAuthenticated = await auth.isAuthenticated();
    expect(isAuthenticated).toBeTruthy();
  });
});
