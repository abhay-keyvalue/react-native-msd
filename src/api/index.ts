import { getFromStorage } from '../utils/storage';
import { BASE_URL } from '../configs/endpoints';
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
    console.log('base_url', base_url);
    // TODO: Need to pass the correct base_url
    const response = await fetch(`${BASE_URL}/${url}`, requestParam);
    return response.json();
  } catch (error) {
    return error;
  }
};

export type { InternalServerError, IValidationError };
