import { getFromStorage } from '../utils/storage';
import type { InternalServerError, IValidationError } from './types';

export const apiCall = async (url: string, method: string, params?: object) => {
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
    const response = await fetch(`${base_url}/${url}`, requestParam);
    return response.json();
  } catch (error) {
    return error;
  }
};

export type { InternalServerError, IValidationError };
