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

// Prepares screen state so the UI does not know any data-source details.
export class ObservationListViewModel {
  constructor(private readonly listObservationsUseCase: ListObservationsUseCase) {}

  async load(): Promise<ObservationListViewState> {
    const observations = await this.listObservationsUseCase.execute();
    const uniqueFloors = new Set(observations.map((observation) => observation.floor));

    return {
      title: 'Housekeeping Observation List',
      subtitle: 'Daily room, area, and issue tracking list',
      summary:
        'Managers can review open issues from every floor in the app and discuss approved items during the housekeeping meeting.',
      facilityName: 'The Marlay',
      areaLabel: `${uniqueFloors.size} active floors`,
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
