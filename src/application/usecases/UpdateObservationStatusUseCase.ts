import type { Observation, ObservationStatus } from '../../domain/entities/Observation';
import type { UserSession } from '../../domain/entities/User';
import type { DailyAreaAssignmentRepository } from '../../domain/repositories/DailyAreaAssignmentRepository';
import type { ObservationRepository } from '../../domain/repositories/ObservationRepository';

// Updates status only when the active user is allowed to work with that observation area.
export interface UpdateObservationStatusUseCase {
  execute(session: UserSession, observationId: string, status: ObservationStatus): Promise<Observation>;
}

export class DefaultUpdateObservationStatusUseCase implements UpdateObservationStatusUseCase {
  constructor(
    private readonly observationRepository: ObservationRepository,
    private readonly dailyAreaAssignmentRepository: DailyAreaAssignmentRepository,
  ) {}

  async execute(
    session: UserSession,
    observationId: string,
    status: ObservationStatus,
  ): Promise<Observation> {
    const observation = await this.observationRepository.findById(observationId);

    if (!observation) {
      throw new Error('Observation was not found.');
    }

    if (session.user.role === 'manager') {
      const updatedObservation = await this.observationRepository.updateStatus(observationId, status);
      if (!updatedObservation) {
        throw new Error('Observation was not found.');
      }
      return updatedObservation;
    }

    const assignment = await this.dailyAreaAssignmentRepository.findForUser(
      session.user.id,
      new Date(),
    );

    if (!assignment || assignment.areaId !== observation.areaId) {
      throw new Error('Housekeeping users can update only their assigned area.');
    }

    const updatedObservation = await this.observationRepository.updateStatus(observationId, status);
    if (!updatedObservation) {
      throw new Error('Observation was not found.');
    }
    return updatedObservation;
  }
}
