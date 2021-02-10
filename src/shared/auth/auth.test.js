import auth from './auth';

jest.mock('./auth');


describe('auth', () => {

  beforeEach(() => {
    console.log('----------');
  });

  it('should login', async () => {
    const spy = jest.spyOn(auth, 'login'); 
    await auth.login();
    expect(spy).toHaveBeenCalled();
  });

  it('should logout', async () => {
    const spy = jest.spyOn(auth, 'logout'); 
    await auth.logout();
    expect(spy).toHaveBeenCalled();
  });

  // it('should not call loadUserInfo when not authenticated', async () => {
  //   const spy = jest.spyOn(auth, 'userInfo'); 
  //   await auth.isAuthenticated.mockReturnValue(false);
  //   await auth.userInfo();
  //   expect(spy).not.toHaveBeenCalled();
  // });

  // it('should call loadUserInfo when authenticated', async () => {
  //   const spy = jest.spyOn(auth, 'userInfo'); 
  //   awaitauth.isAuthenticated.mockReturnValue(true);
  //   await auth.userInfo();
  //   expect(spy).toHaveBeenCalled();
  // });

  // it('should return the token', async () => {
  //   auth.token.mockReturnValue('the-token');
  //   const token = await auth.token();
  //   expect(token).toEqual('the-token');
  // });

  // it('should check the roles', async () => {

    // const keycloakMock  =jest.spyOn(window, 'Keycloak'); // .mockImplementation(() => ({ init : jest.fn()}));

    // keycloakMock.realmAccess.roles.push('bs_all');
    // const canAdd = await auth.canAdd();
    // expect(canAdd).toBeTruthy();
    // const canEdit = await auth.canEdit();
    // expect(canEdit).toBeTruthy();
  // });

  // it('should check the authentication', async () => {
  //   keycloakMock.authenticated = true;
  //   const isAuthenticated = await auth.isAuthenticated();
  //   expect(isAuthenticated).toBeTruthy();
  // });
});
