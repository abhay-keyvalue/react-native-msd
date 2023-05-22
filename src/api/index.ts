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
    const response = await fetch(`${BASE_URL}/${url}`, requestParam);
    return response;
  } catch (error) {
    return error;
  }
};
