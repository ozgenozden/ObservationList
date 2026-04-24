import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { ObservationCard } from '../components/ObservationCard';
import {
  ObservationListViewModel,
  ObservationListViewState,
} from '../viewmodels/ObservationListViewModel';

type ObservationListScreenProps = {
  readonly viewModel: ObservationListViewModel;
};

// Ekran yalnizca UI akisindan sorumludur; veri kurallarini ViewModel'e devreder.
export function ObservationListScreen({ viewModel }: ObservationListScreenProps) {
  const [state, setState] = useState<ObservationListViewState>({
    observations: [],
    isLoading: true,
  });

  useEffect(() => {
    let isMounted = true;

    viewModel.load().then((nextState) => {
      if (isMounted) {
        setState(nextState);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [viewModel]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>ObservationList</Text>
          <Text style={styles.title}>Gozlemlerini duzenli takip et</Text>
          <Text style={styles.description}>
            Bu baslangic mimarisi SOLID prensiplerine gore katmanlara ayrildi.
            Yeni veri kaynaklari, ekranlar ve is kurallari mevcut ana yapi
            bozulmadan eklenebilir.
          </Text>
        </View>

        {state.isLoading ? (
          <ActivityIndicator color="#2563eb" size="large" />
        ) : (
          <View style={styles.list}>
            {state.observations.map((observation) => (
              <ObservationCard key={observation.id} observation={observation} />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    flexGrow: 1,
    padding: 24,
  },
  header: {
    marginBottom: 28,
    paddingTop: 28,
  },
  eyebrow: {
    color: '#2563eb',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  title: {
    color: '#0f172a',
    fontSize: 32,
    fontWeight: '800',
    lineHeight: 40,
    marginBottom: 12,
  },
  description: {
    color: '#475569',
    fontSize: 16,
    lineHeight: 24,
  },
  list: {
    gap: 16,
  },
});
