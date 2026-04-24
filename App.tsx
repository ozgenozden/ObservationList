import { StatusBar } from 'expo-status-bar';

import { createAppDependencies } from './src/app/createAppDependencies';
import { ObservationListScreen } from './src/presentation/screens/ObservationListScreen';

// App dependencies are built in one place so screens do not depend on concrete classes.
const dependencies = createAppDependencies();

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <ObservationListScreen viewModel={dependencies.observationListViewModel} />
    </>
  );
}
