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

// Domain entity that mirrors the main fields from the paper observation checklist.
export interface Observation {
  id: string;
  roomNumber: string;
  floor: string;
  areaId: string;
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
