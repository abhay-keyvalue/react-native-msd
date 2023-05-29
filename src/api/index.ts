import { isNetworkConnectivityAvailable } from 'src/utils/network';
import { getFromStorage } from '../utils/storage';
import type { InternalServerError, IValidationError } from './types';

const TIMEOUT_DURATION = 5000; // Timeout duration in milliseconds

export const apiCall = async (url: string, method: string, params?: object) => {
  const isConnectivityAvailable = await isNetworkConnectivityAvailable();
  if (!isConnectivityAvailable) {
    // internal error ERR005
    throw new Error(
      `{ status: 'ERR005', message: 'Internet connection unavailable.' }`
    );
  }
  try {
    const requestParam: {
      headers: HeadersInit_;
      method: string;
      body?: BodyInit_;
    } = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    if (params) {
      requestParam.body = JSON.stringify(params);
    }
    const apiKey = await getFromStorage('MSD_API_KEY');
    const base_url = await getFromStorage('BASE_URL');
    console.log('apiKey', apiKey);
    // TODO: Need to pass the correct apiKey
    const fetchPromise = fetch(`${base_url}/${url}`, requestParam);
    // Create a promise that rejects after the specified timeout duration
    const timeoutPromise = new Promise((resolve, reject) => {
      console.log('resolve', resolve);
      setTimeout(() => {
        reject(new Error(`{ status: 'ERR006', message: 'Request timed out' }`));
      }, TIMEOUT_DURATION);
    });

    // Use Promise.race to handle either the fetch request completing or the timeout occurring first 
    return Promise.race([fetchPromise, timeoutPromise]);
  } catch (error) {
    console.log('Network error');
    return error;
  }
};

export type { InternalServerError, IValidationError };
