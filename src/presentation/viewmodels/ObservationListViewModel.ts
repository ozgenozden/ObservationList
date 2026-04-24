import { Observation } from '../../domain/entities/Observation';
import { ListObservationsUseCase } from '../../application/usecases/ListObservationsUseCase';

export type ObservationListViewState = {
  title: string;
  subtitle: string;
  meetingNote: string;
  observations: Observation[];
  isLoading: boolean;
};

// Ekranin ihtiyac duydugu veriyi hazirlar; UI veri kaynaginin detaylarini bilmez.
export class ObservationListViewModel {
  constructor(private readonly listObservationsUseCase: ListObservationsUseCase) {}

  async load(): Promise<ObservationListViewState> {
    const observations = await this.listObservationsUseCase.execute();

    return {
      title: 'Housekeeping Observation List',
      subtitle: 'Gunluk oda, kat ve problem takip listesi',
      meetingNote:
        'Bir sonraki housekeeping toplantisinda yonetici tarafindan uygun gorulen maddeler detayli olarak konusulur.',
      observations,
      isLoading: false,
    };
  }
}
