import type { ObservationStatus } from './Observation';

// Filters are shared by manager and housekeeping flows without tying them to UI controls.
export type ObservationFilter = {
  readonly areaId?: string;
  readonly status?: ObservationStatus;
  readonly date?: Date;
};
