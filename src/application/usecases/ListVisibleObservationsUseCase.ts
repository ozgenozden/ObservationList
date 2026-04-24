import type { Observation } from '../../domain/entities/Observation';
import type { ObservationFilter } from '../../domain/entities/ObservationFilter';
import type { UserSession } from '../../domain/entities/User';
import type { DailyAreaAssignmentRepository } from '../../domain/repositories/DailyAreaAssignmentRepository';
import type { ObservationRepository } from '../../domain/repositories/ObservationRepository';

// Lists only the observations that the current role is allowed to see.
export interface ListVisibleObservationsUseCase {
  execute(session: UserSession, filter?: ObservationFilter): Promise<Observation[]>;
}

export class DefaultListVisibleObservationsUseCase implements ListVisibleObservationsUseCase {
  constructor(
    private readonly observationRepository: ObservationRepository,
    private readonly assignmentRepository: DailyAreaAssignmentRepository,
  ) {}

  async execute(session: UserSession, filter: ObservationFilter = {}): Promise<Observation[]> {
    if (session.user.role === 'manager') {
      return this.observationRepository.list(filter);
    }

    const assignment = await this.assignmentRepository.findForUser(session.user.id, new Date());
    if (!assignment) {
      return [];
    }

    return this.observationRepository.list({
      ...filter,
      areaId: assignment.areaId,
    });
  }
}
