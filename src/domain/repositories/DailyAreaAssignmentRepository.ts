import type { DailyAreaAssignment } from '../entities/DailyAreaAssignment';

// Assignment storage can later be backed by an admin API or database.
export interface DailyAreaAssignmentRepository {
  listForDate(workDate: Date): Promise<DailyAreaAssignment[]>;
  findForUser(userId: string, workDate: Date): Promise<DailyAreaAssignment | undefined>;
}
