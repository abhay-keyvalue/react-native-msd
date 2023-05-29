import { isNetworkConnectivityAvailable } from '../utils/network';
import { getFromStorage } from '../utils/storage';
import type { InternalServerError, IValidationError } from './types';

// TODO: Replace with the right duration
const TIMEOUT_DURATION = 5000000; // Timeout duration in milliseconds

export const apiCall = async (url: string, method: string, params?: object) => {
  const isConnectivityAvailable = await isNetworkConnectivityAvailable();
  if (!isConnectivityAvailable) {
    // internal error ERR005
    throw new Error(
      `{ status: 'ERR005', message: 'Internet connection unavailable.' }`
    );
  }
  try {
    const apiKey = await getFromStorage('MSD_API_KEY');
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
      requestParam.body = JSON.stringify(params);
    }
    const base_url = await getFromStorage('BASE_URL');
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), TIMEOUT_DURATION);
    const response = await fetch(`${base_url}/${url}`, {
      ...requestParam,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    console.log('Network error');
    return error;
  }
};

export type { InternalServerError, IValidationError };
