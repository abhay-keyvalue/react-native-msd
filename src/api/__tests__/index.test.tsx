import { apiCall } from '../index'; // Replace 'your-module-file' with the actual path to your module

// Mock the necessary dependencies
jest.mock('./your-storage-module', () => ({
  getFromStorage: jest.fn().mockResolvedValue('mock_value'),
}));
jest.mock('node-fetch', () => jest.fn());

describe('apiCall', () => {
  it('should make a successful API call and return the response', async () => {
    const mockUrl = 'https://example.com/api';
    const mockMethod = 'POST';
    const mockParams = { id: 123 };

    // Mock the response from the fetch function
    const mockResponse = {
      json: jest.fn().mockResolvedValue({ success: true }),
    };
    (fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

    // Call the apiCall function
    const result = await apiCall(mockUrl, mockMethod, mockParams);

    // Verify the expected fetch URL and request parameters
    expect(fetch).toHaveBeenCalledWith(
      `mock_value/${mockUrl}`,
      expect.objectContaining({
        method: mockMethod,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mockParams),
      })
    );

    // Verify the response
    expect(result).toEqual({ success: true });
  });

  it('should handle an error and return the error object', async () => {
    const mockUrl = 'https://example.com/api';
    const mockMethod = 'GET';

    // Mock the error from the fetch function
    (fetch as jest.Mock).mockRejectedValueOnce('Network error');

    // Call the apiCall function
    const result = await apiCall(mockUrl, mockMethod);

    // Verify the expected fetch URL and request parameters
    expect(fetch).toHaveBeenCalledWith(
      `mock_value/${mockUrl}`,
      expect.objectContaining({
        method: mockMethod,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    );

    // Verify the error object
    expect(result).toEqual('Network error');
  });
});
