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
      // TODO: Replace with JSON.stringify(params); Giving sample body for testing purpose
      requestParam.body = JSON.stringify({
        blox_uuid: '5fbeac07-f385-4145-a690-e98571ae985e',
        user_id: null,
        platform: 'desktop',
        module_name: 'Similar Products',
        catalogs: {
          d18edb1c46: {
            fields: ['title', 'price', 'image_link', 'link'],
            context: {
              variant_id: '39596296700022',
            },
          },
        },
      });
    }
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
