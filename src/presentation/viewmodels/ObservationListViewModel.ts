import { Observation } from '../../domain/entities/Observation';
import { ListObservationsUseCase } from '../../application/usecases/ListObservationsUseCase';

export type ObservationListViewState = {
  title: string;
  subtitle: string;
  observations: Observation[];
};

// Ekranin ihtiyac duydugu veriyi hazirlar; UI veri kaynaginin detaylarini bilmez.
export class ObservationListViewModel {
  constructor(private readonly listObservationsUseCase: ListObservationsUseCase) {}

  async getInitialState(): Promise<ObservationListViewState> {
    const observations = await this.listObservationsUseCase.execute();

    return {
      title: 'ObservationList',
      subtitle: 'Gozlemleri kaydetmek, siniflandirmak ve takip etmek icin hazirlanan mobil uygulama.',
      observations,
    };
  }
}
