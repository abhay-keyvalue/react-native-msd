import { BASE_URL } from 'src/configs/endpoints';
import { apiCall } from '../index';

describe('apiCall', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(
      () =>
        Promise.resolve({
          json: () => Promise.resolve({ success: true }),
        }) as any
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should make a successful API call and return the parsed JSON response', async () => {
    const url = 'exampleUrl';
    const method = 'POST';
    const params = { foo: 'bar' };
    const responseData = { success: true };

    const response = await apiCall(url, method, params);

    expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/${url}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    expect(response).toEqual(responseData);
  });

  it('should handle API call errors and return the error', async () => {
    const url = 'exampleUrl';
    const method = 'GET';
    const error = new Error('API call failed');

    jest
      .spyOn(global, 'fetch')
      .mockImplementation(() => Promise.reject(error) as any);

    const response = await apiCall(url, method);

    expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/${url}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    expect(response).toEqual(error);
  });
});
