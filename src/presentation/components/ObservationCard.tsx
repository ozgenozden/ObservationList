import { StyleSheet, Text, View } from 'react-native';

import type { Observation } from '../../domain/entities/Observation';

type ObservationCardProps = {
  observation: Observation;
};

// Tek bir gozlem kartini cizer; liste ekrani kart detaylarini bilmek zorunda kalmaz.
export function ObservationCard({ observation }: ObservationCardProps) {
  const reportedAtLabel = observation.reportedAt.toLocaleDateString('tr-TR');

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.room}>Oda {observation.roomNumber}</Text>
          <Text style={styles.floor}>{observation.floor} - {reportedAtLabel}</Text>
        </View>
        <View style={[styles.badge, priorityStyles[observation.priority]]}>
          <Text style={styles.badgeText}>{priorityLabels[observation.priority]}</Text>
        </View>
      </View>

      <Text style={styles.category}>{categoryLabels[observation.category]}</Text>
      <Text style={styles.description}>{observation.description}</Text>

      <View style={styles.metaGrid}>
        <MetaItem label="Durum" value={statusLabels[observation.status]} />
        <MetaItem label="Yazan" value={observation.reportedBy} />
      </View>

      {observation.meetingNote ? (
        <View style={styles.meetingNote}>
          <Text style={styles.meetingLabel}>Toplanti notu</Text>
          <Text style={styles.meetingText}>{observation.meetingNote}</Text>
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

// UI metinleri burada tutulur; domain degerleri ekranda dogrudan gosterilmez.
const statusLabels: Record<Observation['status'], string> = {
  open: 'Acik',
  inProgress: 'Devam ediyor',
  completed: 'Tamamlandi',
  followUpNeeded: 'Takip gerekli',
};

const priorityLabels: Record<Observation['priority'], string> = {
  low: 'Dusuk',
  normal: 'Normal',
  high: 'Onemli',
  urgent: 'Acil',
};

const categoryLabels: Record<Observation['category'], string> = {
  maintenance: 'Bakim / kirik esya',
  cleaning: 'Temizlik',
  deepCleaning: 'Deep cleaning',
  safety: 'Guvenlik',
  roomUpdate: 'Oda duzeni',
  supplies: 'Eksik malzeme',
  note: 'Genel not',
};

const priorityStyles: Record<Observation['priority'], object> = {
  low: { backgroundColor: '#e0f2fe' },
  normal: { backgroundColor: '#dcfce7' },
  high: { backgroundColor: '#fef3c7' },
  urgent: { backgroundColor: '#fee2e2' },
};

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
    marginBottom: 12,
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
});
