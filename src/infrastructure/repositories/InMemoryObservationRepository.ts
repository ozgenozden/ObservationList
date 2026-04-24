import { Observation } from '../../domain/entities/Observation';
import { ObservationRepository } from '../../domain/repositories/ObservationRepository';

const SAMPLE_OBSERVATIONS: Observation[] = [
  {
    id: '1',
    title: 'Ilk saha gozlemi',
    description: 'Yeni gozlem kaydi icin baslangic verisi.',
    createdAt: new Date('2026-04-24T21:00:00.000Z'),
  },
  {
    id: '2',
    title: 'Takip edilecek not',
    description: 'Repository degistirilmeden farkli veri kaynaklari eklenebilir.',
    createdAt: new Date('2026-04-24T21:15:00.000Z'),
  },
];

export class InMemoryObservationRepository implements ObservationRepository {
  // Simdilik lokal veri kullanir; API veya veritabani icin ayni interface uygulanir.
  async findAll(): Promise<Observation[]> {
    return [...SAMPLE_OBSERVATIONS];
  }
}
