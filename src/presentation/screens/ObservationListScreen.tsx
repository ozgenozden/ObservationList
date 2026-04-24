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
    title: 'ObservationList',
    subtitle: 'Housekeeping gunluk takip listesi',
    summary: 'Bugun icin kayit bekleniyor.',
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
          <Text style={styles.eyebrow}>Nursing Home Housekeeping</Text>
          <Text style={styles.title}>{state.title}</Text>
          <Text style={styles.subtitle}>{state.subtitle}</Text>
          <Text style={styles.description}>{state.summary}</Text>
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
  subtitle: {
    color: '#1e293b',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 26,
    marginBottom: 8,
  },
  list: {
    gap: 16,
  },
});
