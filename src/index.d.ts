declare module 'index' {
  export const useEvents: () => {
    track: (eventName: string, params: object) => Promise<void>;
  };

  export const useRecommendations: () => {
    getRecommendations: (params: object) => Promise<void>;
    recommendations: object;
  };

  export const init: (key: string) => Promise<void>;
}
