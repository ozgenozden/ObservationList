export type ObservationStatus = 'planned' | 'inProgress' | 'completed';

// Domain entity: uygulamanin is kurallarinda kullanacagi temel gozlem modeli.
export interface Observation {
  id: string;
  title: string;
  description: string;
  status: ObservationStatus;
  createdAt: Date;
}
