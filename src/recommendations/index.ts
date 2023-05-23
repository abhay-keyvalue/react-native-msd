import { useState } from 'react';
import { apiCall } from '../api';

export const useRecommendations = () => {
  const [recommendations, setRecommendations] = useState<object>({});

  const getRecommendations = async (params: object) => {
    const result = await apiCall('products', 'POST', params);
    setRecommendations(result || {});
  };

  return {
    getRecommendations,
    recommendations,
  };
};
