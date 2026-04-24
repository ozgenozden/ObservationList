import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from 'react-native';

import { createAppDependencies } from './src/application/container/createAppDependencies';
import { HomeScreen } from './src/presentation/screens/HomeScreen';

// Uygulama bagimliliklari tek noktada kurulur; ekranlar somut siniflara baglanmaz.
const dependencies = createAppDependencies();

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <HomeScreen getObservationOverview={dependencies.getObservationOverview} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fb',
  },
});
