import { DefaultListHousekeepingAreasUseCase } from '../application/usecases/ListHousekeepingAreasUseCase';
import { DefaultListObservationsUseCase } from '../application/usecases/ListObservationsUseCase';
import type { HousekeepingAreaRepository } from '../domain/repositories/HousekeepingAreaRepository';
import type { ObservationRepository } from '../domain/repositories/ObservationRepository';
import { InMemoryHousekeepingAreaRepository } from '../infrastructure/repositories/InMemoryHousekeepingAreaRepository';
import { InMemoryObservationRepository } from '../infrastructure/repositories/InMemoryObservationRepository';
import { ObservationListViewModel } from '../presentation/viewmodels/ObservationListViewModel';

export type AppDependencies = {
  observationListViewModel: ObservationListViewModel;
};

export function createAppDependencies(): AppDependencies {
  // Composition root: concrete classes are connected in one controlled place.
  const housekeepingAreaRepository: HousekeepingAreaRepository =
    new InMemoryHousekeepingAreaRepository();
  const observationRepository: ObservationRepository = new InMemoryObservationRepository();
  const listHousekeepingAreasUseCase = new DefaultListHousekeepingAreasUseCase(
    housekeepingAreaRepository,
  );
  const listObservationsUseCase = new DefaultListObservationsUseCase(observationRepository);

  return {
    observationListViewModel: new ObservationListViewModel(
      listObservationsUseCase,
      listHousekeepingAreasUseCase,
    ),
  };
}
