import { BASE_URL, MSD_API_KEY, USER_ID } from './constants';
import { useEvents } from './events';
import { useRecommendations } from './recommendations';
import { generateAndSaveMadId, saveToStorage } from './utils/storage';

const init = async ({ token, baseUrl }: { token: string; baseUrl: string }) => {
  if (token?.length > 0) {
    await saveToStorage(MSD_API_KEY, token);
    console.log('token:', token);
  } else {
    console.log(`{ status: 'ERR001', message: 'The token provided is empty' }`);
  }
  await saveToStorage(BASE_URL, baseUrl);
  console.log('baseUrl:', baseUrl);
  await generateAndSaveMadId();
};

const setUser = async ({ userId }: { userId: string }) => {
  await saveToStorage(USER_ID, userId);
  console.log('userId:', userId);
};

export { init, setUser, useEvents, useRecommendations };
