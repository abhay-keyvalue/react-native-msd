import AsyncStorage from '@react-native-async-storage/async-storage';
import { uuid } from 'uuidv4';

import { MAD_UUID } from '../constants';
import { msdLogger } from './logger';

export const saveToStorage = async (key: string, value: string) => {
  try {
    const result = await AsyncStorage.setItem(key, value);
    return result;
  } catch (err) {
    msdLogger(`Error while save ${key} to storage`);
    return null;
  }
};

export const getFromStorage = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (err) {
    msdLogger(`Error while get ${key} from storage`);
    return null;
  }
};

export const generateAndSaveMadId = async () => {
  let madUuid = await getFromStorage(MAD_UUID);
  if (!madUuid) {
    madUuid = uuid();
    await saveToStorage(MAD_UUID, madUuid);
    msdLogger(`madId: ${madUuid}`);
  }
};
