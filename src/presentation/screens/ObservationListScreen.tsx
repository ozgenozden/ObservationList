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
    facilityName: 'The Marlay',
    areaLabel: 'Tum katlar',
    monthLabel: 'Ocak 2026',
    dashboard: {
      total: 0,
      open: 0,
      urgent: 0,
      completed: 0,
    },
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
          <Text style={styles.facility}>{state.facilityName}</Text>
          <Text style={styles.title}>{state.title}</Text>
          <Text style={styles.subtitle}>{state.subtitle}</Text>
          <View style={styles.formMeta}>
            <Text style={styles.formMetaText}>Area: {state.areaLabel}</Text>
            <Text style={styles.formMetaText}>Month: {state.monthLabel}</Text>
          </View>
          <Text style={styles.description}>{state.summary}</Text>
          <View style={styles.dashboard}>
            <DashboardItem label="Toplam" value={state.dashboard.total} />
            <DashboardItem label="Acik" value={state.dashboard.open} />
            <DashboardItem label="Acil" value={state.dashboard.urgent} />
            <DashboardItem label="Biten" value={state.dashboard.completed} />
          </View>
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

type DashboardItemProps = {
  readonly label: string;
  readonly value: number;
};

function DashboardItem({ label, value }: DashboardItemProps) {
  return (
    <View style={styles.dashboardItem}>
      <Text style={styles.dashboardValue}>{value}</Text>
      <Text style={styles.dashboardLabel}>{label}</Text>
    </View>
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
  facility: {
    color: '#475569',
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  description: {
    color: '#475569',
    fontSize: 16,
    lineHeight: 24,
  },
  formMeta: {
    backgroundColor: '#eff6ff',
    borderRadius: 14,
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
    marginBottom: 14,
    padding: 12,
  },
  formMetaText: {
    color: '#1e3a8a',
    fontSize: 13,
    fontWeight: '800',
  },
  dashboard: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 18,
  },
  dashboardItem: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    flex: 1,
    padding: 12,
  },
  dashboardValue: {
    color: '#0f172a',
    fontSize: 20,
    fontWeight: '900',
  },
  dashboardLabel: {
    color: '#64748b',
    fontSize: 11,
    fontWeight: '800',
    marginTop: 4,
    textTransform: 'uppercase',
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
