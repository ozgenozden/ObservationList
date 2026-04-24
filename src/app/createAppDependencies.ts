import { ListObservationsUseCase } from '../application/usecases/ListObservationsUseCase';
import type { ObservationRepository } from '../domain/repositories/ObservationRepository';
import { InMemoryObservationRepository } from '../infrastructure/repositories/InMemoryObservationRepository';
import { ObservationListViewModel } from '../presentation/viewmodels/ObservationListViewModel';

export type AppDependencies = {
  observationListViewModel: ObservationListViewModel;
};

export function createAppDependencies(): AppDependencies {
  // Composition root: somut siniflar yalnizca burada birbirine baglanir.
  const observationRepository: ObservationRepository = new InMemoryObservationRepository();
  const listObservationsUseCase = new ListObservationsUseCase(observationRepository);

  return {
    observationListViewModel: new ObservationListViewModel(listObservationsUseCase),
  };
}
