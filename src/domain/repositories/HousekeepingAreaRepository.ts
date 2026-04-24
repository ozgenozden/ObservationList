import type { HousekeepingArea } from '../entities/HousekeepingArea';

// Repository contract for Marlay housekeeping area definitions.
export interface HousekeepingAreaRepository {
  list(): Promise<HousekeepingArea[]>;
}
