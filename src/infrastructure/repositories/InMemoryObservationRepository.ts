import type { Observation } from '../../domain/entities/Observation';
import type { ObservationRepository } from '../../domain/repositories/ObservationRepository';

const SAMPLE_OBSERVATIONS: Observation[] = [
  {
    id: '1',
    roomNumber: '214',
    floor: '2nd Floor',
    area: 'East Wing',
    reportedBy: 'Maria L.',
    signature: 'Maria L.',
    category: 'maintenance',
    priority: 'high',
    status: 'open',
    description:
      'Bedside cabinet drawer is broken. The resident is having difficulty using it, so maintenance should be notified.',
    meetingNote:
      'Create a maintenance request after manager review in the housekeeping meeting.',
    reportedAt: new Date('2026-04-24T08:30:00.000Z'),
  },
  {
    id: '2',
    roomNumber: '108',
    floor: '1st Floor',
    area: 'Memory Care',
    reportedBy: 'John K.',
    signature: 'John K.',
    category: 'deepCleaning',
    priority: 'normal',
    status: 'followUpNeeded',
    description:
      'Deep cleaning was started, but the bathroom cabinet was not completed. Tomorrow shift should continue here first.',
    meetingNote:
      'Pass the unfinished area to the morning shift as a priority follow-up.',
    reportedAt: new Date('2026-04-24T14:10:00.000Z'),
  },
  {
    id: '3',
    roomNumber: '305',
    floor: '3rd Floor',
    area: 'West Wing',
    reportedBy: 'Aylin S.',
    signature: 'Aylin S.',
    category: 'note',
    priority: 'low',
    status: 'completed',
    description:
      'Room wardrobe was reorganised and missing towels were replaced.',
    meetingNote:
      'Marked as completed; share in the meeting for information only.',
    reportedAt: new Date('2026-04-24T16:45:00.000Z'),
  },
];

export class InMemoryObservationRepository implements ObservationRepository {
  // Keeps starter data local; API or database repositories can implement the same interface later.
  async list(): Promise<Observation[]> {
    return [...SAMPLE_OBSERVATIONS];
  }
}
