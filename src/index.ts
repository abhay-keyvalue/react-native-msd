import { useEvents } from './events';
import { useRecommendations } from './recommendations';
import { saveToStorage } from './utils/storage';

const init = async (key: string) => {
  await saveToStorage('apiKey', key);
};

const MSD = {
  init: init,
  useEvents: useEvents,
  useRecommendations: useRecommendations,
};

export default MSD;
