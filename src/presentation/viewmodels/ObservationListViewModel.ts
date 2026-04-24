import { Observation } from '../../domain/entities/Observation';
import { ListObservationsUseCase } from '../../application/usecases/ListObservationsUseCase';

export type ObservationListSummary = {
  total: number;
  open: number;
  urgent: number;
  completed: number;
};

export type ObservationListViewState = {
  title: string;
  subtitle: string;
  summary: string;
  facilityName: string;
  areaLabel: string;
  monthLabel: string;
  dashboard: ObservationListSummary;
  observations: Observation[];
  isLoading: boolean;
};

// Ekranin ihtiyac duydugu veriyi hazirlar; UI veri kaynaginin detaylarini bilmez.
export class ObservationListViewModel {
  constructor(private readonly listObservationsUseCase: ListObservationsUseCase) {}

  async load(): Promise<ObservationListViewState> {
    const observations = await this.listObservationsUseCase.execute();
    const uniqueFloors = new Set(observations.map((observation) => observation.floor));

    return {
      title: 'Housekeeping Observation List',
      subtitle: 'Gunluk oda, kat ve problem takip listesi',
      summary:
        'Yoneticiler tum katlardaki acik konulari uygulamadan takip eder; uygun maddeler toplantida detayli konusulur.',
      facilityName: 'The Marlay',
      areaLabel: `${uniqueFloors.size} aktif kat`,
      monthLabel: 'January 2026',
      dashboard: {
        total: observations.length,
        open: observations.filter((observation) => observation.status !== 'completed').length,
        urgent: observations.filter((observation) => observation.priority === 'urgent').length,
        completed: observations.filter((observation) => observation.status === 'completed').length,
      },
      observations,
      isLoading: false,
    };
  }
}
