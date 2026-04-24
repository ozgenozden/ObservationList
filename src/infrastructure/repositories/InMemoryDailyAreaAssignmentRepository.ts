import type { DailyAreaAssignment } from '../../domain/entities/DailyAreaAssignment';
import type { DailyAreaAssignmentRepository } from '../../domain/repositories/DailyAreaAssignmentRepository';

const TODAY_ASSIGNMENTS: DailyAreaAssignment[] = [
  {
    id: 'assignment-1',
    userId: 'hk-john',
    areaId: 'whitechurch-1',
    assignedDate: new Date('2026-04-24T00:00:00.000Z'),
  },
];

export class InMemoryDailyAreaAssignmentRepository implements DailyAreaAssignmentRepository {
  // Later this can come from the manager schedule API without changing the use cases.
  async listForDate(workDate: Date): Promise<DailyAreaAssignment[]> {
    return TODAY_ASSIGNMENTS.filter((assignment) =>
      isSameDay(assignment.assignedDate, workDate),
    );
  }

  async findForUser(
    userId: string,
    workDate: Date,
  ): Promise<DailyAreaAssignment | undefined> {
    return TODAY_ASSIGNMENTS.find(
      (assignment) =>
        assignment.userId === userId && isSameDay(assignment.assignedDate, workDate),
    );
  }
}

function isSameDay(firstDate: Date, secondDate: Date): boolean {
  return firstDate.toISOString().slice(0, 10) === secondDate.toISOString().slice(0, 10);
}
