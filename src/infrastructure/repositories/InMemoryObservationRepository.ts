import type { Observation } from '../../domain/entities/Observation';
import type { ObservationRepository } from '../../domain/repositories/ObservationRepository';

const SAMPLE_OBSERVATIONS: Observation[] = [
  {
    id: '1',
    roomNumber: '214',
    floor: '2. Kat',
    area: 'East Wing',
    reportedBy: 'Maria L.',
    signature: 'Maria L.',
    category: 'maintenance',
    priority: 'high',
    status: 'open',
    description:
      'Komodin cekmecesi kirik. Resident kullanirken zorlandigi icin bakim ekibine bildirilmesi gerekiyor.',
    meetingNote:
      'Housekeeping toplantisinda yonetici onayiyla maintenance talebi acilacak.',
    reportedAt: new Date('2026-04-24T08:30:00.000Z'),
  },
  {
    id: '2',
    roomNumber: '108',
    floor: '1. Kat',
    area: 'Memory Care',
    reportedBy: 'John K.',
    signature: 'John K.',
    category: 'deepCleaning',
    priority: 'normal',
    status: 'followUpNeeded',
    description:
      'Deep cleaning basladi fakat banyo dolabi bitmedi. Yarin calisacak ekip once buradan devam etmeli.',
    meetingNote:
      'Eksik kalan alan sabah vardiyasina oncelikli is olarak aktarilacak.',
    reportedAt: new Date('2026-04-24T14:10:00.000Z'),
  },
  {
    id: '3',
    roomNumber: '305',
    floor: '3. Kat',
    area: 'West Wing',
    reportedBy: 'Aylin S.',
    signature: 'Aylin S.',
    category: 'note',
    priority: 'low',
    status: 'completed',
    description:
      'Oda dolap ici yeniden duzenlendi ve eksik havlu tamamlandi.',
    meetingNote:
      'Tamamlandi olarak kaydedildi; toplantida yalnizca bilgi amacli paylasilacak.',
    reportedAt: new Date('2026-04-24T16:45:00.000Z'),
  },
];

export class InMemoryObservationRepository implements ObservationRepository {
  // Simdilik lokal veri kullanir; API veya veritabani icin ayni interface uygulanir.
  async list(): Promise<Observation[]> {
    return [...SAMPLE_OBSERVATIONS];
  }
}
