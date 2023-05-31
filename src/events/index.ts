import { apiCall } from '../api';
import { ERROR_CODES } from '../constants';
import { logger } from '../utils/logger';
import type { ITrackRequest } from './types';

export const useEvents = () => {
  const track = async (eventName: string, params?: ITrackRequest) => {
    if (eventName?.length > 0) {
      logger.info(`eventName: ${eventName}`);
      let eventParams = {
        event_name: eventName,
        timestamp: Date.now(),
      };
      if (params) {
        eventParams = { ...eventParams, ...params };
      } else {
        logger.error(
          `{ status: ${ERROR_CODES.ERR003.code}, message: ${ERROR_CODES.ERR003.message} }`
        );
      }
      await apiCall('api/v1/events/track', 'POST', eventParams);
    } else {
      logger.error(
        `{ status: ${ERROR_CODES.ERR002.code}, message: ${ERROR_CODES.ERR002.message} }`
      );
    }
  };
  return {
    track,
  };
};
