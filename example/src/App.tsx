import * as React from 'react';

import { StyleSheet, View, Text, ScrollView } from 'react-native';
import MSD from 'react-native-msd';

export default function App() {
  const { recommendations, getRecommendations } = MSD.useRecommendations();

  React.useEffect(() => {
    MSD.init('sampleApiKey');
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text onPress={() => getRecommendations({ page: 1 })}>
          Result: {JSON.stringify(recommendations)}
        </Text>
      </ScrollView>
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
