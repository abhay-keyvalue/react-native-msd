import { useEvents } from './events';
import { useRecommendations } from './recommendations';
import { saveToStorage } from './utils/storage';

const MSD = () => {
  const init = async (key: string) => {
    await saveToStorage('apiKey', key);
  };

  return {
    init,
    useEvents,
    useRecommendations,
  };
};

export default MSD;
