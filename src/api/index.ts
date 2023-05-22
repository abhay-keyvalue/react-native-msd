import { BASE_URL } from '../configs/endpoints';

export const apiCall = async (url: string, params: object) => {
  try {
    const response = await fetch(`${BASE_URL}/${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    return response;
  } catch (error) {
    return error;
  }
};
