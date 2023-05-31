import { MSD_BASE_URL, ERROR_CODES, MSD_API_KEY, USER_ID } from './constants';
import { useEvents } from './events';
import { useRecommendations } from './recommendations';
import { logger } from './utils/logger';
import { generateAndSaveMadId, saveToStorage } from './utils/storage';

const init = async ({ token, baseUrl }: { token: string; baseUrl: string }) => {
  if (token?.length > 0) {
    await saveToStorage(MSD_API_KEY, token);
    logger.info(`token: ${token}`);
  } else {
    logger.error(
      `{ status: ${ERROR_CODES.ERR001.code}, message: ${ERROR_CODES.ERR001.message} }`
    );
  }
  await saveToStorage(MSD_BASE_URL, baseUrl);
  logger.info(`baseUrl: ${baseUrl}`);
  await generateAndSaveMadId();
};

const setUser = async ({ userId }: { userId: string }) => {
  await saveToStorage(USER_ID, userId);
  logger.info(`userId: ${userId}`);
};

export { init, setUser, useEvents, useRecommendations };
