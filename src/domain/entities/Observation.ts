export type ObservationStatus = 'open' | 'inProgress' | 'completed' | 'followUpNeeded';
export type ObservationPriority = 'low' | 'normal' | 'high' | 'urgent';
export type ObservationCategory =
  | 'maintenance'
  | 'cleaning'
  | 'deepCleaning'
  | 'safety'
  | 'roomUpdate'
  | 'supplies'
  | 'note';

// Domain entity: housekeeping observation kagidindaki ana alanlari temsil eder.
export interface Observation {
  id: string;
  roomNumber: string;
  floor: string;
  area: string;
  reportedAt: Date;
  reportedBy: string;
  signature: string;
  category: ObservationCategory;
  description: string;
  meetingNote?: string;
  status: ObservationStatus;
  priority: ObservationPriority;
}
