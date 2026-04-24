import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { ObservationStatus } from '../../domain/entities/Observation';
import type { ObservationFilter } from '../../domain/entities/ObservationFilter';
import type { UserRole } from '../../domain/entities/User';
import { ObservationCard } from '../components/ObservationCard';
import {
  ObservationListViewModel,
  ObservationListViewState,
} from '../viewmodels/ObservationListViewModel';

type ObservationListScreenProps = {
  readonly viewModel: ObservationListViewModel;
};

// The screen handles only UI flow and delegates data rules to the ViewModel.
export function ObservationListScreen({ viewModel }: ObservationListScreenProps) {
  const [state, setState] = useState<ObservationListViewState>({
    title: 'ObservationList',
    subtitle: 'Daily housekeeping follow-up list',
    summary: 'No observations have been recorded for today yet.',
    facilityName: 'The Marlay',
    userName: 'Loading user',
    roleLabel: 'Loading role',
    permissionNote: 'Loading permissions.',
    areaLabel: 'All floors',
    monthLabel: 'January 2026',
    dashboard: {
      total: 0,
      open: 0,
      urgent: 0,
      completed: 0,
      areas: 0,
    },
    permissions: {
      roleLabel: 'Loading role',
      accessLabel: 'Loading permissions',
      canSeeAllAreas: false,
      canFilter: false,
      canAddObservation: false,
      canUpdateStatus: false,
      statusOptions: [],
    },
    areaCoverage: [],
    observations: [],
    isLoading: true,
  });
  const [selectedRole, setSelectedRole] = useState<UserRole>('manager');
  const [selectedFilter, setSelectedFilter] = useState<ObservationFilter>({});

  useEffect(() => {
    let isMounted = true;

    viewModel.load({ filter: selectedFilter, role: selectedRole }).then((nextState) => {
      if (isMounted) {
        setState(nextState);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [selectedFilter, selectedRole, viewModel]);

  const changeRole = (role: UserRole) => {
    setSelectedRole(role);
    setSelectedFilter({});
  };

  const changeStatus = (status: ObservationStatus) => {
    setSelectedFilter((currentFilter) => ({
      ...currentFilter,
      status: currentFilter.status === status ? undefined : status,
    }));
  };

  const updateObservationStatus = async (
    observationId: string,
    nextStatus: ObservationStatus,
  ) => {
    await viewModel.previewStatusUpdate(observationId, nextStatus, selectedRole);
    const nextState = await viewModel.load({ filter: selectedFilter, role: selectedRole });
    setState(nextState);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>Nursing Home Housekeeping</Text>
          <Text style={styles.facility}>{state.facilityName}</Text>
          <Text style={styles.title}>{state.title}</Text>
          <Text style={styles.subtitle}>{state.subtitle}</Text>
          <View style={styles.sessionCard}>
            <Text style={styles.sessionName}>{state.userName}</Text>
            <Text style={styles.sessionRole}>{state.roleLabel}</Text>
            <Text style={styles.sessionNote}>{state.permissionNote}</Text>
          </View>
          <View style={styles.roleSwitcher}>
            <RoleButton
              isActive={selectedRole === 'manager'}
              label="Manager demo"
              onPress={() => changeRole('manager')}
            />
            <RoleButton
              isActive={selectedRole === 'housekeeper'}
              label="Housekeeper demo"
              onPress={() => changeRole('housekeeper')}
            />
          </View>
          <View style={styles.formMeta}>
            <Text style={styles.formMetaText}>Area: {state.areaLabel}</Text>
            <Text style={styles.formMetaText}>Month: {state.monthLabel}</Text>
          </View>
          <Text style={styles.description}>{state.summary}</Text>
          <View style={styles.actionPanel}>
            <Text style={styles.panelTitle}>
              {state.permissions.canFilter ? 'Manager filters' : 'Housekeeper access'}
            </Text>
            <Text style={styles.panelText}>
              {state.permissions.canFilter
                ? 'Managers can filter by status now; date and area filters are ready in the use-case layer.'
                : 'Housekeepers can see and update only today\'s assigned area.'}
            </Text>
            {state.permissions.canFilter ? (
              <View style={styles.filterRow}>
                {state.permissions.statusOptions.map((status) => (
                  <FilterButton
                    isActive={selectedFilter.status === status}
                    key={status}
                    label={statusLabels[status]}
                    onPress={() => changeStatus(status)}
                  />
                ))}
              </View>
            ) : null}
          </View>
          <View style={styles.dashboard}>
            <DashboardItem label="Total" value={state.dashboard.total} />
            <DashboardItem label="Open" value={state.dashboard.open} />
            <DashboardItem label="Urgent" value={state.dashboard.urgent} />
            <DashboardItem label="Done" value={state.dashboard.completed} />
            <DashboardItem label="Areas" value={state.dashboard.areas} />
          </View>
        </View>

        {state.isLoading ? (
          <ActivityIndicator color="#2563eb" size="large" />
        ) : (
          <>
            <View style={styles.areaSection}>
              <Text style={styles.sectionTitle}>Area coverage</Text>
              <View style={styles.areaGrid}>
                {state.areaCoverage.map((area) => (
                  <View key={area.id} style={styles.areaCard}>
                    <Text style={styles.areaName}>{area.name}</Text>
                    <Text style={styles.areaMeta}>{area.floor}</Text>
                    <Text style={styles.areaMeta}>
                      Rooms {area.roomRange} - {area.observationCount} observations
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.list}>
              {state.observations.map((observation) => (
                <ObservationCard
                  canUpdateStatus={state.permissions.canUpdateStatus}
                  key={observation.id}
                  onStatusChange={updateObservationStatus}
                  observation={observation}
                  statusOptions={state.permissions.statusOptions}
                />
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const statusLabels: Record<ObservationStatus, string> = {
  open: 'Open',
  inProgress: 'In progress',
  completed: 'Completed',
  followUpNeeded: 'Follow-up needed',
};

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

type RoleButtonProps = {
  readonly isActive: boolean;
  readonly label: string;
  readonly onPress: () => void;
};

function RoleButton({ isActive, label, onPress }: RoleButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.roleButton, isActive ? styles.activeRoleButton : undefined]}
    >
      <Text style={[styles.roleButtonText, isActive ? styles.activeRoleButtonText : undefined]}>
        {label}
      </Text>
    </Pressable>
  );
}

type FilterButtonProps = {
  readonly isActive: boolean;
  readonly label: string;
  readonly onPress: () => void;
};

function FilterButton({ isActive, label, onPress }: FilterButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.filterButton, isActive ? styles.activeFilterButton : undefined]}
    >
      <Text
        style={[styles.filterButtonText, isActive ? styles.activeFilterButtonText : undefined]}
      >
        {label}
      </Text>
    </Pressable>
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
  sessionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    marginBottom: 14,
    padding: 14,
  },
  sessionName: {
    color: '#0f172a',
    fontSize: 16,
    fontWeight: '900',
  },
  sessionRole: {
    color: '#2563eb',
    fontSize: 13,
    fontWeight: '800',
    marginTop: 4,
    textTransform: 'uppercase',
  },
  sessionNote: {
    color: '#475569',
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 19,
    marginTop: 8,
  },
  roleSwitcher: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 14,
  },
  roleButton: {
    backgroundColor: '#e2e8f0',
    borderRadius: 12,
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  activeRoleButton: {
    backgroundColor: '#2563eb',
  },
  roleButtonText: {
    color: '#334155',
    fontSize: 13,
    fontWeight: '900',
    textAlign: 'center',
  },
  activeRoleButtonText: {
    color: '#ffffff',
  },
  actionPanel: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    marginTop: 14,
    padding: 14,
  },
  panelTitle: {
    color: '#0f172a',
    fontSize: 15,
    fontWeight: '900',
    marginBottom: 6,
  },
  panelText: {
    color: '#475569',
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 19,
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  filterButton: {
    backgroundColor: '#f1f5f9',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  activeFilterButton: {
    backgroundColor: '#dbeafe',
  },
  filterButtonText: {
    color: '#475569',
    fontSize: 12,
    fontWeight: '800',
  },
  activeFilterButtonText: {
    color: '#1d4ed8',
  },
  areaSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#0f172a',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 12,
  },
  areaGrid: {
    gap: 10,
  },
  areaCard: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 14,
  },
  areaName: {
    color: '#0f172a',
    fontSize: 16,
    fontWeight: '800',
  },
  areaMeta: {
    color: '#64748b',
    fontSize: 13,
    fontWeight: '700',
    marginTop: 4,
  },
  list: {
    gap: 16,
  },
});
