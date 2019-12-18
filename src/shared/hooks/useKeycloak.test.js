import { renderHook, act } from '@testing-library/react-hooks';
import useKeycloak from './useKeycloak';
import auth from '../auth/auth';

jest.mock('../auth/auth');

describe('useKeycloak', () => {
  auth.isAuthenticated.mockReturnValue(true);
  auth.canAdd.mockReturnValue(true);
  auth.canEdit.mockReturnValue(true);
  auth.login.mockReturnValue(true);

  it('should set the authenticated flag depending on the keycloak authorization callback', async () => {
    const { result } = renderHook(() => useKeycloak());
    const user = result.current;
    expect(user.authenticated).toEqual(false);

    await act(async () => {
      auth.login();
    });

    expect(result.current.authenticated).toBeTruthy();
  });
});
