import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import MSD from 'react-native-msd';

export default function App() {
  const { useRecommendations } = MSD();
  const { recommendations, getRecommendations } = useRecommendations();

  return (
    <View style={styles.container}>
      <Text onPress={() => getRecommendations({ page: 1 })}>
        Result: {JSON.stringify(recommendations)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
