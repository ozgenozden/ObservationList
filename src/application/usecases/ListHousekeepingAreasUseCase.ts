import type { HousekeepingArea } from '../../domain/entities/HousekeepingArea';
import type { HousekeepingAreaRepository } from '../../domain/repositories/HousekeepingAreaRepository';

// Provides the area catalogue without exposing where that catalogue is stored.
export interface ListHousekeepingAreasUseCase {
  execute(): Promise<HousekeepingArea[]>;
}

// Keeps the area listing business action isolated from UI and data-source details.
export class DefaultListHousekeepingAreasUseCase implements ListHousekeepingAreasUseCase {
  constructor(private readonly housekeepingAreaRepository: HousekeepingAreaRepository) {}

  async execute(): Promise<HousekeepingArea[]> {
    return this.housekeepingAreaRepository.list();
  }
}
