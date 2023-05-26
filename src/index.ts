import { useEvents } from './events';
import { useRecommendations } from './recommendations';
import { generateAndSaveMadId, saveToStorage } from './utils/storage';

const init = async ({ token, baseUrl }: { token: string; baseUrl: string }) => {
  await saveToStorage('MSD_API_KEY', token);
  await saveToStorage('BASE_URL', baseUrl);
  await generateAndSaveMadId();
};

const setUser = async ({ userId }: { userId: string }) => {
  await saveToStorage('USER_ID', userId);
};

export { init, setUser, useEvents, useRecommendations };
