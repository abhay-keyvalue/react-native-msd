import { apiCall } from '../api';

export const useEvents = () => {
  const track = async (eventName: string, params: object) => {
    if (!params) {
      console.log(`{ status: 'ERR003', message: 'Missing event data' }`);
    }
    if (eventName?.length > 0) {
      console.log(`eventName:`, eventName);
      await apiCall('api/v1/events/track', 'POST', {
        event_name: eventName,
        timestamp: Date.now(),
      });
    } else {
      console.log(`{ status: 'ERR002', message: 'The event name is empty' }`);
    }
  };
  return {
    track,
  };
};
