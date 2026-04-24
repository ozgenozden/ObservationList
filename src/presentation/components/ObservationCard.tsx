import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { Observation, ObservationStatus } from '../../domain/entities/Observation';

type ObservationCardProps = {
  observation: Observation;
  readonly canUpdateStatus?: boolean;
  readonly onStatusChange?: (observationId: string, status: ObservationStatus) => void;
  readonly statusOptions?: ObservationStatus[];
};

// Renders a single observation card so the list screen stays focused on layout.
export function ObservationCard({
  observation,
  canUpdateStatus = false,
  onStatusChange,
  statusOptions = statusActionOptions,
}: ObservationCardProps) {
  const reportedAtLabel = observation.reportedAt.toLocaleDateString('en-IE');

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.room}>Room {observation.roomNumber}</Text>
          <Text style={styles.floor}>
            {observation.area} - {reportedAtLabel}
          </Text>
        </View>
        <View style={[styles.badge, priorityStyles[observation.priority]]}>
          <Text style={styles.badgeText}>{priorityLabels[observation.priority]}</Text>
        </View>
      </View>

      <Text style={styles.category}>{categoryLabels[observation.category]}</Text>
      <Text style={styles.description}>{observation.description}</Text>

      <View style={styles.metaGrid}>
        <MetaItem label="Status" value={statusLabels[observation.status]} />
        <MetaItem label="Signature" value={observation.signature} />
      </View>

      <Text style={styles.reportedBy}>Reported by: {observation.reportedBy}</Text>

      {observation.meetingNote ? (
        <View style={styles.meetingNote}>
          <Text style={styles.meetingLabel}>Meeting note</Text>
          <Text style={styles.meetingText}>{observation.meetingNote}</Text>
        </View>
      ) : null}

      {canUpdateStatus ? (
        <View style={styles.statusActions}>
          <Text style={styles.statusActionsTitle}>Change status</Text>
          {statusOptions.map((status) => (
            <Pressable
              key={status}
              onPress={() => onStatusChange?.(observation.id, status)}
              style={[
                styles.statusButton,
                observation.status === status ? styles.statusButtonActive : null,
              ]}
            >
              <Text style={styles.statusButtonText}>{statusLabels[status]}</Text>
            </Pressable>
          ))}
        </View>
      ) : null}
    </View>
  );
}

type MetaItemProps = {
  readonly label: string;
  readonly value: string;
};

function MetaItem({ label, value }: MetaItemProps) {
  return (
    <View style={styles.metaItem}>
      <Text style={styles.metaLabel}>{label}</Text>
      <Text style={styles.metaValue}>{value}</Text>
    </View>
  );
}

// UI copy is mapped here so domain values are not shown directly.
const statusLabels: Record<Observation['status'], string> = {
  open: 'Open',
  inProgress: 'In progress',
  completed: 'Completed',
  followUpNeeded: 'Follow-up needed',
};

const priorityLabels: Record<Observation['priority'], string> = {
  low: 'Low',
  normal: 'Normal',
  high: 'Important',
  urgent: 'Urgent',
};

const categoryLabels: Record<Observation['category'], string> = {
  maintenance: 'Maintenance / broken item',
  cleaning: 'Cleaning',
  deepCleaning: 'Deep cleaning',
  safety: 'Safety',
  roomUpdate: 'Room update',
  supplies: 'Missing supplies',
  note: 'General note',
};

const priorityStyles: Record<Observation['priority'], object> = {
  low: { backgroundColor: '#e0f2fe' },
  normal: { backgroundColor: '#dcfce7' },
  high: { backgroundColor: '#fef3c7' },
  urgent: { backgroundColor: '#fee2e2' },
};

const statusActionOptions: ObservationStatus[] = [
  'open',
  'inProgress',
  'followUpNeeded',
  'completed',
];

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 12,
    padding: 16,
    shadowColor: '#0f172a',
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 2,
  },
  header: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  room: {
    color: '#0f172a',
    fontSize: 20,
    fontWeight: '800',
  },
  floor: {
    color: '#64748b',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 4,
  },
  badge: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  badgeText: {
    color: '#0f172a',
    fontSize: 12,
    fontWeight: '800',
  },
  category: {
    color: '#2563eb',
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  description: {
    color: '#4b5563',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 14,
  },
  metaGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 8,
  },
  metaItem: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    flex: 1,
    padding: 12,
  },
  metaLabel: {
    color: '#64748b',
    fontSize: 12,
    fontWeight: '600',
  },
  metaValue: {
    color: '#0f172a',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 4,
  },
  reportedBy: {
    color: '#64748b',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 12,
  },
  meetingNote: {
    backgroundColor: '#fefce8',
    borderRadius: 12,
    padding: 12,
  },
  meetingLabel: {
    color: '#854d0e',
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  meetingText: {
    color: '#713f12',
    fontSize: 14,
    lineHeight: 20,
  },
  statusActions: {
    borderTopColor: '#e2e8f0',
    borderTopWidth: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
    paddingTop: 12,
  },
  statusActionsTitle: {
    color: '#475569',
    fontSize: 12,
    fontWeight: '800',
    width: '100%',
  },
  statusButton: {
    backgroundColor: '#eff6ff',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  statusButtonActive: {
    backgroundColor: '#bfdbfe',
  },
  statusButtonText: {
    color: '#1e3a8a',
    fontSize: 12,
    fontWeight: '800',
  },
});
