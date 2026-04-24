import type { Observation } from '../entities/Observation';

// Veri kaynagi degisse bile uygulama kurallari bu sozlesmeye bagli kalir.
export interface ObservationRepository {
  list(): Promise<Observation[]>;
}
