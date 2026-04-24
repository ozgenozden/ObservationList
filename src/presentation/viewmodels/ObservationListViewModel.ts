import { Observation } from '../../domain/entities/Observation';
import { ListObservationsUseCase } from '../../application/usecases/ListObservationsUseCase';

export type ObservationListSummary = {
  totalCount: number;
  openCount: number;
  urgentCount: number;
  floorCount: number;
};

export type ObservationListViewState = {
  title: string;
  subtitle: string;
  summary: string;
  formArea: string;
  formMonth: string;
  supervisorSignature: string;
  managerSummary: ObservationListSummary;
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
      formArea: 'All Housekeeping Floors',
      formMonth: 'January 2026',
      supervisorSignature: 'HKM Supervisor',
      managerSummary: {
        totalCount: observations.length,
        openCount: observations.filter((observation) => observation.status !== 'completed').length,
        urgentCount: observations.filter((observation) => observation.priority === 'urgent').length,
        floorCount: uniqueFloors.size,
      },
      observations,
      isLoading: false,
    };
  }
}
