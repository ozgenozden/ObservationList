import type {
  Observation,
  ObservationStatus,
} from '../../domain/entities/Observation';
import type { ObservationFilter } from '../../domain/entities/ObservationFilter';
import type { ObservationRepository } from '../../domain/repositories/ObservationRepository';

const SAMPLE_OBSERVATIONS: Observation[] = [
  {
    id: '1',
    roomNumber: '214',
    floor: '2nd Floor',
    areaId: 'three-rock-1',
    area: 'Three Rock 1',
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
    areaId: 'whitechurch-1',
    area: 'Whitechurch 1',
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
    roomNumber: '31',
    floor: 'Ground Floor',
    areaId: 'grange-2',
    area: 'Grange 2',
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
  async list(filter: ObservationFilter = {}): Promise<Observation[]> {
    return SAMPLE_OBSERVATIONS.filter((observation) => matchesFilter(observation, filter));
  }

  async listByArea(areaId: string): Promise<Observation[]> {
    return SAMPLE_OBSERVATIONS.filter((observation) => observation.areaId === areaId);
  }

  async findById(observationId: string): Promise<Observation | undefined> {
    return SAMPLE_OBSERVATIONS.find((observation) => observation.id === observationId);
  }

  async updateStatus(observationId: string, status: ObservationStatus): Promise<Observation> {
    const observationIndex = SAMPLE_OBSERVATIONS.findIndex(
      (observation) => observation.id === observationId,
    );

    if (observationIndex === -1) {
      throw new Error('Observation not found.');
    }

    const updatedObservation = {
      ...SAMPLE_OBSERVATIONS[observationIndex],
      status,
    };
    SAMPLE_OBSERVATIONS[observationIndex] = updatedObservation;

    return updatedObservation;
  }
}

function matchesFilter(observation: Observation, filter: ObservationFilter): boolean {
  const matchesArea = filter.areaId ? observation.areaId === filter.areaId : true;
  const matchesStatus = filter.status ? observation.status === filter.status : true;
  const matchesDate = filter.date
    ? observation.reportedAt.toDateString() === filter.date.toDateString()
    : true;

  return matchesArea && matchesStatus && matchesDate;
}
