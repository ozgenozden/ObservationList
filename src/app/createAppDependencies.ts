import { DefaultListHousekeepingAreasUseCase } from '../application/usecases/ListHousekeepingAreasUseCase';
import { DefaultGetCurrentUserSessionUseCase } from '../application/usecases/GetCurrentUserSessionUseCase';
import { DefaultListVisibleObservationsUseCase } from '../application/usecases/ListVisibleObservationsUseCase';
import { DefaultUpdateObservationStatusUseCase } from '../application/usecases/UpdateObservationStatusUseCase';
import type { HousekeepingAreaRepository } from '../domain/repositories/HousekeepingAreaRepository';
import type { ObservationRepository } from '../domain/repositories/ObservationRepository';
import type { DailyAreaAssignmentRepository } from '../domain/repositories/DailyAreaAssignmentRepository';
import type { UserSessionRepository } from '../domain/repositories/UserSessionRepository';
import { InMemoryDailyAreaAssignmentRepository } from '../infrastructure/repositories/InMemoryDailyAreaAssignmentRepository';
import { InMemoryHousekeepingAreaRepository } from '../infrastructure/repositories/InMemoryHousekeepingAreaRepository';
import { InMemoryObservationRepository } from '../infrastructure/repositories/InMemoryObservationRepository';
import { InMemoryUserSessionRepository } from '../infrastructure/repositories/InMemoryUserSessionRepository';
import { ObservationListViewModel } from '../presentation/viewmodels/ObservationListViewModel';

export type AppDependencies = {
  observationListViewModel: ObservationListViewModel;
};

export function createAppDependencies(): AppDependencies {
  // Composition root: concrete classes are connected in one controlled place.
  const housekeepingAreaRepository: HousekeepingAreaRepository =
    new InMemoryHousekeepingAreaRepository();
  const dailyAreaAssignmentRepository: DailyAreaAssignmentRepository =
    new InMemoryDailyAreaAssignmentRepository();
  const observationRepository: ObservationRepository = new InMemoryObservationRepository();
  const userSessionRepository: UserSessionRepository = new InMemoryUserSessionRepository();
  const listHousekeepingAreasUseCase = new DefaultListHousekeepingAreasUseCase(
    housekeepingAreaRepository,
  );
  const getCurrentUserSessionUseCase = new DefaultGetCurrentUserSessionUseCase(
    userSessionRepository,
  );
  const listVisibleObservationsUseCase = new DefaultListVisibleObservationsUseCase(
    observationRepository,
    dailyAreaAssignmentRepository,
  );
  const updateObservationStatusUseCase = new DefaultUpdateObservationStatusUseCase(
    observationRepository,
    dailyAreaAssignmentRepository,
  );

  return {
    observationListViewModel: new ObservationListViewModel(
      getCurrentUserSessionUseCase,
      listVisibleObservationsUseCase,
      listHousekeepingAreasUseCase,
      updateObservationStatusUseCase,
    ),
  };
}
