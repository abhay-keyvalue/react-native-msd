import { useState } from 'react';
import { apiCall } from '../api';
import { getFromStorage } from '../utils/storage';

export const useRecommendations = () => {
  const [recommendations, setRecommendations] = useState<object>({});
  const getRecommendations = async (params: object) => {
    const apiKey = await getFromStorage('apiKey');
    console.log('apiKey', apiKey);
    const result = await apiCall('products', 'POST', params);
    setRecommendations(result || {});
  };

  return {
    getRecommendations,
    recommendations,
  };
};
