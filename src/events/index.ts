import { apiCall } from '../api';

export const useEvents = () => {
  const track = async (eventName: string, params: object) => {
    console.log('eventName', eventName);
    await apiCall('categories', 'POST', params);
  };
  return {
    track,
  };
};
