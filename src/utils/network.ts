import NetInfo from '@react-native-community/netinfo';

export const isNetworkConnectivityAvailable = async () => {
  const netInfoState = await NetInfo.fetch();
  return netInfoState?.isConnected;
};
