import { useState } from 'react';

import { apiCall, InternalServerError } from '../api';
import type {
  IGetRecommendationRequest,
  IGetRecommendationBasic,
} from './types';

export const useRecommendations = () => {
  const [recommendations, setRecommendations] = useState<object | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<InternalServerError>();

  const getRecommendation = async (
    basicParams: IGetRecommendationBasic,
    properties: IGetRecommendationRequest
  ) => {
    if (properties) {
      setLoading(true);
      const params = {
        ...basicParams,
        ...properties,
      };

      apiCall('api/v1/search', 'POST', params)
        .then((response: any) => {
          return response.json();
        })
        .then((result) => {
          setLoading(false);
          setRecommendations(result?.data || null);
          setError(result?.error);
        })
        .catch(() => {
          setLoading(false);
          setError({
            errors: [{ code: 'ERR006', message: 'Request timed out' }],
          });
        });
    } else {
      setError({
        errors: [{ code: 'ERR004', message: 'Missing recommendation data' }],
      });
    }
  };

  const getRecommendationByStrategy = async (
    strategy_reference: string,
    properties: IGetRecommendationRequest
  ) => {
    getRecommendation(
      {
        strategy_name: strategy_reference,
      },
      properties
    );
  };

  const getRecommendationByModule = async (
    module_reference: string,
    properties: IGetRecommendationRequest
  ) => {
    getRecommendation(
      {
        module_name: module_reference,
      },
      properties
    );
  };

  const getRecommendationByPage = async (
    page_reference: string,
    properties: IGetRecommendationRequest
  ) => {
    getRecommendation(
      {
        page_name: page_reference,
      },
      properties
    );
    setLoading(true);
  };

  const getRecommendationByText = async (
    text_reference: string,
    properties: IGetRecommendationRequest
  ) => {
    // TODO: Confirm if the param is correct. Documentation provided seems to be wrong
    getRecommendation(
      {
        text_name: text_reference,
      },
      properties
    );
  };

  return {
    getRecommendationByStrategy,
    getRecommendationByModule,
    getRecommendationByPage,
    getRecommendationByText,
    recommendations: { data: recommendations, isLoading: loading, error },
  };
};
