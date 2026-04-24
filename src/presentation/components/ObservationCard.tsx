import { StyleSheet, Text, View } from 'react-native';

import type { Observation } from '../../domain/entities/Observation';

type ObservationCardProps = {
  observation: Observation;
};

// Tek bir gozlem kartini cizer; liste ekrani kart detaylarini bilmek zorunda kalmaz.
export function ObservationCard({ observation }: ObservationCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{observation.title}</Text>
      <Text style={styles.description}>{observation.description}</Text>
      <Text style={styles.date}>{observation.observedAt}</Text>
    </View>
  );
}

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
  title: {
    color: '#111827',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  description: {
    color: '#4b5563',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 10,
  },
  date: {
    color: '#64748b',
    fontSize: 13,
    fontWeight: '600',
  },
});
