import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveToStorage = async (key: string, value: string) => {
  try {
    const result = await AsyncStorage.setItem(key, value);
    return result;
  } catch (err) {
    return null;
  }
};

export const getFromStorage = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (err) {
    return null;
  }
};
