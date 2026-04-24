import { DefaultListObservationsUseCase } from '../application/usecases/ListObservationsUseCase';
import type { ObservationRepository } from '../domain/repositories/ObservationRepository';
import { InMemoryObservationRepository } from '../infrastructure/repositories/InMemoryObservationRepository';
import { ObservationListViewModel } from '../presentation/viewmodels/ObservationListViewModel';

export type AppDependencies = {
  observationListViewModel: ObservationListViewModel;
};

export function createAppDependencies(): AppDependencies {
  // Composition root: concrete classes are connected in one controlled place.
  const observationRepository: ObservationRepository = new InMemoryObservationRepository();
  const listObservationsUseCase = new DefaultListObservationsUseCase(observationRepository);

  return {
    observationListViewModel: new ObservationListViewModel(listObservationsUseCase),
  };
}
