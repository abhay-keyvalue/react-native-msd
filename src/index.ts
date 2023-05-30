import { BASE_URL, ERROR_CODES, MSD_API_KEY, USER_ID } from './constants';
import { useEvents } from './events';
import { useRecommendations } from './recommendations';
import { logger } from './utils/logger';
import { generateAndSaveMadId, saveToStorage } from './utils/storage';

const init = async ({ token, baseUrl }: { token: string; baseUrl: string }) => {
  if (token?.length > 0) {
    await saveToStorage(MSD_API_KEY, token);
    logger.log(`token: ${token}`);
  } else {
    logger.error(
      `{ status: ${ERROR_CODES.ERR001.code}, message: ${ERROR_CODES.ERR001.message} }`
    );
  }
  await saveToStorage(BASE_URL, baseUrl);
  logger.log(`baseUrl: ${baseUrl}`);
  await generateAndSaveMadId();
};

const setUser = async ({ userId }: { userId: string }) => {
  await saveToStorage(USER_ID, userId);
  logger.log(`userId: ${userId}`);
};

export { init, setUser, useEvents, useRecommendations };
