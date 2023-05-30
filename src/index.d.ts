import type { IGetRecommendationRequest } from './recommendations/types.ts';

declare module 'index' {
  export const useEvents: () => {
    track: (eventName: string, params: object) => Promise<void>;
  };

  export const useRecommendations: () => {
    getRecommendationByStrategy: (
      strategy_reference: string,
      properties: IGetRecommendationRequest
    ) => Promise<void>;
    getRecommendationByModule: (
      module_reference: string,
      properties: IGetRecommendationRequest
    ) => Promise<void>;
    getRecommendationByPage: (
      page_reference: string,
      properties: IGetRecommendationRequest
    ) => Promise<void>;
    getRecommendationByText: (
      text_reference: string,
      properties: IGetRecommendationRequest
    ) => Promise<void>;
    recommendations: object;
  };

  export const init: (options: {
    token: string;
    baseUrl: string;
  }) => Promise<void>;

  export const setUser: (options: { userId: string }) => Promise<void>;
}
