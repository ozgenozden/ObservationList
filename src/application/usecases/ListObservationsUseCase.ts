import type { Observation } from '../../domain/entities/Observation';
import type { ObservationRepository } from '../../domain/repositories/ObservationRepository';

// Use case, ekranlarin veri kaynagi detaylarini bilmeden is kurallarini calistirmasini saglar.
export interface ListObservationsUseCase {
  execute(): Promise<Observation[]>;
}

// Bu sinif yalnizca gozlem listeleme senaryosundan sorumludur.
export class DefaultListObservationsUseCase implements ListObservationsUseCase {
  constructor(private readonly observationRepository: ObservationRepository) {}

  async execute(): Promise<Observation[]> {
    return this.observationRepository.list();
  }
}
