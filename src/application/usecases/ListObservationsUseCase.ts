import type { Observation } from '../../domain/entities/Observation';
import type { ObservationRepository } from '../../domain/repositories/ObservationRepository';

// Use cases let screens run business flows without knowing the data source details.
export interface ListObservationsUseCase {
  execute(): Promise<Observation[]>;
}

// This class is responsible only for the observation listing scenario.
export class DefaultListObservationsUseCase implements ListObservationsUseCase {
  constructor(private readonly observationRepository: ObservationRepository) {}

  async execute(): Promise<Observation[]> {
    return this.observationRepository.list();
  }
}
