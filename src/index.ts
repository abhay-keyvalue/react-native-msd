import { useEvents } from './events';
import { useRecommendations } from './recommendations';
import { generateAndSaveMadId, saveToStorage } from './utils/storage';

const init = async ({ token, baseUrl }: { token: string; baseUrl: string }) => {
  if (token?.length > 0) {
    await saveToStorage('MSD_API_KEY', token);
  } else {
    // internal error ERR001
    console.log(`{ status: 'ERR001', message: 'The token provided is empty' }`);
  }
  await saveToStorage('BASE_URL', baseUrl);
  await generateAndSaveMadId();
};

const setUser = async ({ userId }: { userId: string }) => {
  await saveToStorage('USER_ID', userId);
};

export { init, setUser, useEvents, useRecommendations };
