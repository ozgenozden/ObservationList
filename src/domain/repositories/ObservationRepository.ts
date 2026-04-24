import type { Observation } from '../entities/Observation';

// Application rules depend on this contract even when the data source changes.
export interface ObservationRepository {
  list(): Promise<Observation[]>;
  listByArea(areaId: string): Promise<Observation[]>;
}
