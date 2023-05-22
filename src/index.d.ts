declare module 'MSD' {
  export function init(key: string): void;
  export function useEvents(): { track: (params: any) => void };
  export function useRecommendations(): {
    getRecommendations: (params: any) => void;
    recommendations: object;
  };
}
