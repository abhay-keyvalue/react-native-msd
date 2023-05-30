import { apiCall } from '../api';
import { ERROR_CODES } from '../constants';
import { msdLogger } from '../utils/logger';

export const useEvents = () => {
  const track = async (eventName: string, params: object) => {
    if (!params) {
      msdLogger(
        `{ status: ${ERROR_CODES.ERR003.code}, message: ${ERROR_CODES.ERR003.message} }`
      );
    }
    if (eventName?.length > 0) {
      msdLogger(`eventName: ${eventName}`);
      await apiCall('api/v1/events/track', 'POST', {
        event_name: eventName,
        timestamp: Date.now(),
      });
    } else {
      msdLogger(
        `{ status: ${ERROR_CODES.ERR002.code}, message: ${ERROR_CODES.ERR002.message} }`
      );
    }
  };
  return {
    track,
  };
};
