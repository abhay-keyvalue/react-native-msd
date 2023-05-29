import { apiCall } from '../api';

export const useEvents = () => {
  const track = async (eventName: string, params: object) => {
    if (!params) {
      // internal error ERR003
      console.log(`{ status: 'ERR003', message: 'Missing event data' }`);
    }
    if (eventName?.length > 0) {
      await apiCall('categories', 'POST', params);
    } else {
      // internal error ERR002
      console.log(`{ status: 'ERR002', message: 'The event name is empty' }`);
    }
  };
  return {
    track,
  };
};
