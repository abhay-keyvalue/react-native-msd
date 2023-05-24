import { BASE_URL } from '../../configs/endpoints';
import { apiCall } from '../index';

describe('apiCall', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
  });

  it('should make an API call with the correct parameters and return the JSON response', async () => {
    const url = 'products';
    const method = 'POST';
    const params = { page: 1 };

    // Mock the fetch function and its response
    const mockResponse = { data: 'Example response' };
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    // Call the apiCall function
    const result = await apiCall(url, method, params);

    // Check if fetch was called with the correct URL and parameters
    expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/${url}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    // Check if the response was parsed as JSON
    expect(result).toEqual(mockResponse);
  });

  it('should return an error if an exception occurs during the API call', async () => {
    const url = 'example.com/api';
    const method = 'GET';

    // Mock the fetch function to throw an error
    jest.spyOn(global, 'fetch').mockRejectedValueOnce('Network error');

    // Call the apiCall function
    const result = await apiCall(url, method);

    // Check if the error was returned
    expect(result).toEqual('Network error');
  });
});
