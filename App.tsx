import { StatusBar } from 'expo-status-bar';

import { createAppDependencies } from './src/app/createAppDependencies';
import { ObservationListScreen } from './src/presentation/screens/ObservationListScreen';

// Uygulama bagimliliklari tek noktada kurulur; ekranlar somut siniflara baglanmaz.
const dependencies = createAppDependencies();

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <ObservationListScreen viewModel={dependencies.observationListViewModel} />
    </>
  );
}
