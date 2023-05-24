import { useEvents } from './events';
import { useRecommendations } from './recommendations';
import { generateAndSaveMadId, saveToStorage } from './utils/storage';

const init = async (key: string) => {
  await saveToStorage('MSD_API_KEY', key);
  await generateAndSaveMadId();
};

export { init, useEvents, useRecommendations };
