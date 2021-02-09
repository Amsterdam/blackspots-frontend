import { generateParams, getWithToken } from './api';

jest.mock('../auth/auth');

// auth.keycloak = {
//   token: 'token12345',
// };

describe('Auth service', () => {
  // describe('getAccessToken', () => {
  //   it('should return the keycloak token', () => {});

  //   expect(getAccessToken()).toEqual(auth.keycloak.token);
  // });

  describe('generateParams', () => {
    it('should create a url query from an object', () => {
      expect(
        generateParams({
          entryOne: 'foo',
          entryTwo: 'bar',
        })
      ).toEqual('entryOne=foo&entryTwo=bar');
    });
  });

  describe('getWithToken', () => {
    beforeEach(() => {
      fetch.resetMocks();
    });

    const response = {
      data: 'hello',
    };

    it('should return the response from fetch', async () => {
      fetch.mockResponseOnce(JSON.stringify(response));

      const result = await getWithToken(
        'http://localhost/',
        'json',
        {
          entryOne: 'foo',
          entryTwo: 'bar',
        },
        false,
        'token12345'
      );

      expect(result).toEqual(response);
    });

    //   it('should not return the response from fetch when service is unavailable', async () => {
    //     fetch.mockResponseOnce(JSON.stringify(response), { status: 503 });

    //     return expect(
    //       getWithToken(
    //         'http://localhost/',
    //         {
    //           entryOne: 'foo',
    //           entryTwo: 'bar',
    //         },
    //         false,
    //         'token12345'
    //       )
    //     ).rejects.toThrow('Service Unavailable');
    //   });

    //   it('should pass a signal: true to fetch options and add the token to the header', async () => {
    //     fetch.mockResponseOnce(JSON.stringify(response));

    //     await getWithToken(
    //       'http://localhost/',
    //       {
    //         entryOne: 'foo',
    //         entryTwo: 'bar',
    //       },
    //       true,
    //       'token12345'
    //     );

    //     expect('signal' in fetch.mock.calls[0][1]).toBe(true);
    //     expect(fetch.mock.calls[0][1].headers).toEqual({
    //       Authorization: 'Bearer token12345',
    //     });
    //   });
    // });

    // describe('sendData', () => {
    //   const responseMock = {
    //     data: 'hello',
    //   };

    //   beforeEach(() => {
    //     fetch.resetMocks();
    //   });

    //   it('should post the data and return success', async () => {
    //     fetch.mockResponseOnce(JSON.stringify(responseMock));

    //     const response = await sendData('http://localhost/', {
    //       entryOne: 'foo',
    //       entryTwo: 'bar',
    //     });

    //     expect(fetch.mock.calls[0][1].headers).toEqual({
    //       Authorization: `Bearer token12345`,
    //     });

    //     expect(response).toEqual(responseMock);
    //   });
  });
});
