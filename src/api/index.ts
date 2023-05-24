import { getFromStorage } from '../utils/storage';
import { BASE_URL } from '../configs/endpoints';

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
    console.log('apiKey', apiKey);
    const response = await fetch(`${BASE_URL}/${url}`, requestParam);
    return response.json();
  } catch (error) {
    return error;
  }
};
