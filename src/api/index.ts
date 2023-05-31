import { Platform } from 'react-native';

import { MSD_BASE_URL, MAD_UUID, MSD_API_KEY, USER_ID } from '../constants';
import { isNetworkConnectivityAvailable } from '../utils/network';
import { getFromStorage } from '../utils/storage';
import { logger } from '../utils/logger';
import type { InternalServerError, IValidationError } from './types';

const TIMEOUT_DURATION = 50000; // Timeout duration in milliseconds

export const apiCall = async (url: string, method: string, params?: object) => {
  try {
    const isConnectivityAvailable = await isNetworkConnectivityAvailable();
    if (!isConnectivityAvailable) {
      throw new Error(
        `{ status: 'ERR005', message: 'Internet connection unavailable.' }`
      );
    }
    const apiKey = await getFromStorage(MSD_API_KEY);
    const userId = await getFromStorage(USER_ID);
    const madUuid = await getFromStorage(MAD_UUID);
    const requestParam: {
      headers: HeadersInit_;
      method: string;
      body?: BodyInit_;
    } = {
      method,
      headers: {
        'Content-Type': 'application/json',
        // TODO: Remove empty string, giving to avoid type error
        'x-api-key': apiKey || '',
      },
    };
    if (params) {
      requestParam.body = JSON.stringify({
        ...params,
        blox_uuid: madUuid,
        user_id: userId,
        platform: Platform.OS,
      });
    }
    const baseUrl = await getFromStorage(MSD_BASE_URL);
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), TIMEOUT_DURATION);
    logger.info(`url: ${baseUrl}/${url}`);
    logger.info(`apiKey: ${apiKey}`);
    logger.info(`reqBody: ${requestParam.body}`);
    const response = await fetch(`${baseUrl}/${url}`, {
      ...requestParam,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    logger.error(`Api call error: ${error}`);
    return error;
  }
};

export type { InternalServerError, IValidationError };
