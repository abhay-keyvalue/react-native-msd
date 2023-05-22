import { apiCall } from '../api';
import { getFromStorage } from '../utils/storage';

export const useEvents = () => {
  const track = async (eventName: string, params: object) => {
    const apiKey = await getFromStorage('apiKey');
    console.log('apiKey', eventName, apiKey);
    await apiCall('categories', 'POST', params);
  };
  return {
    track,
  };
};
