import { useState } from 'react';

import { apiCall, InternalServerError } from '../api';
import type {
  IGetRecommendation,
  IGetRecommendationByTextRequest,
  IGetRecommendationRequest,
} from './types';

export const useRecommendations = () => {
  const [recommendations, setRecommendations] = useState<object>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<InternalServerError>();

  const getRecommendation = async (params: IGetRecommendation) => {
    setLoading(true);
    try {
      console.log({ params });
      // TODO: Replace this with correct path and params. (Giving following for testing purposes)
      const result = await apiCall('products', 'POST', { page: 1 });
      setLoading(false);
      if (result.status === '200') {
        setRecommendations(result || {});
      } else {
        setError(result);
      }
    } catch (err) {
      setLoading(false);
      console.log('Error fetching recommendations', err);
      throw err;
    }
  };

  const getRecommendationByStrategy = async (
    strategy_reference: string,
    properties: IGetRecommendationRequest
  ) => {
    getRecommendation({
      strategy_name: strategy_reference,
      ...properties,
    });
  };

  const getRecommendationByModule = async (
    module_reference: string,
    properties: IGetRecommendationRequest
  ) => {
    getRecommendation({
      module_name: module_reference,
      ...properties,
    });
  };

  const getRecommendationByPage = async (
    page_reference: string,
    properties: IGetRecommendationRequest
  ) => {
    getRecommendation({
      page_name: page_reference,
      ...properties,
    });
    setLoading(true);
  };

  const getRecommendationByText = async (
    text_reference: string,
    properties: IGetRecommendationByTextRequest
  ) => {
    // TODO: Confirm if the param is correct. Documentation provided seems to be wrong
    getRecommendation({
      text_name: text_reference,
      ...properties,
    });
  };

  return {
    getRecommendationByStrategy,
    getRecommendationByModule,
    getRecommendationByPage,
    getRecommendationByText,
    recommendations: { data: recommendations, isLoading: loading, error },
  };
};
