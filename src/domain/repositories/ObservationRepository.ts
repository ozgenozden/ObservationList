import type { Observation } from '../entities/Observation';
import type { ObservationFilter } from '../entities/ObservationFilter';
import type { ObservationStatus } from '../entities/Observation';

// Application rules depend on this contract even when the data source changes.
export interface ObservationRepository {
  list(filter?: ObservationFilter): Promise<Observation[]>;
  listByArea(areaId: string): Promise<Observation[]>;
  findById(observationId: string): Promise<Observation | undefined>;
  updateStatus(observationId: string, status: ObservationStatus): Promise<Observation | undefined>;
}
