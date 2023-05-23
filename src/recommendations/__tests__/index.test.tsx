import { useState } from 'react';
import { useRecommendations } from '../../recommendations';
import { getFromStorage } from '../../utils/storage';
import { apiCall } from '../../api';

jest.mock('./utils', () => ({
  getFromStorage: jest.fn(),
  apiCall: jest.fn(),
}));

jest.mock('react', () => ({
  useState: jest.fn(),
}));

describe('useRecommendations', () => {
  let recommendations: ReturnType<typeof useRecommendations>;
  let setState: jest.Mock;

  beforeEach(() => {
    setState = jest.fn();
    (useState as jest.Mock).mockReturnValue([{}, setState]);
    recommendations = useRecommendations();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getRecommendations', () => {
    it('should call getFromStorage and apiCall with the correct arguments and update recommendations state', async () => {
      const params = { foo: 'bar' };
      const apiKey = 'mockApiKey';
      const result = { recommendation: 'data' };

      (getFromStorage as jest.Mock).mockResolvedValue(apiKey);
      (apiCall as jest.Mock).mockResolvedValue(result);

      await recommendations.getRecommendations(params);

      expect(getFromStorage).toHaveBeenCalledWith('apiKey');
      expect(apiCall).toHaveBeenCalledWith('products', 'POST', params);
      expect(setState).toHaveBeenCalledWith(result);
    });

    it('should log the apiKey', async () => {
      const params = { foo: 'bar' };
      const apiKey = 'mockApiKey';

      (getFromStorage as jest.Mock).mockResolvedValue(apiKey);

      const consoleLogSpy = jest.spyOn(console, 'log');
      consoleLogSpy.mockImplementation(() => {});

      await recommendations.getRecommendations(params);

      expect(consoleLogSpy).toHaveBeenCalledWith('apiKey', apiKey);

      consoleLogSpy.mockRestore();
    });

    it('should update recommendations state with an empty object if apiCall returns falsy value', async () => {
      const params = { foo: 'bar' };
      const apiKey = 'mockApiKey';

      (getFromStorage as jest.Mock).mockResolvedValue(apiKey);
      (apiCall as jest.Mock).mockResolvedValue(null);

      await recommendations.getRecommendations(params);

      expect(setState).toHaveBeenCalledWith({});
    });
  });
});
