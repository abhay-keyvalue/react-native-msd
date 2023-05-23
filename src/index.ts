import { useEvents } from './events';
import { useRecommendations } from './recommendations';
import { saveToStorage } from './utils/storage';

const init = async (key: string) => {
  await saveToStorage('apiKey', key);
};

export { init, useEvents, useRecommendations };
