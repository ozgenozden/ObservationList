import { HousekeepingArea } from '../../domain/entities/HousekeepingArea';
import { Observation } from '../../domain/entities/Observation';
import { ListHousekeepingAreasUseCase } from '../../application/usecases/ListHousekeepingAreasUseCase';
import { ListObservationsUseCase } from '../../application/usecases/ListObservationsUseCase';

export type ObservationListSummary = {
  total: number;
  open: number;
  urgent: number;
  completed: number;
  areas: number;
};

export type AreaCoverageItem = {
  id: string;
  name: string;
  floor: string;
  roomRange: string;
  observationCount: number;
};

export type ObservationListViewState = {
  title: string;
  subtitle: string;
  summary: string;
  facilityName: string;
  areaLabel: string;
  monthLabel: string;
  dashboard: ObservationListSummary;
  areaCoverage: AreaCoverageItem[];
  observations: Observation[];
  isLoading: boolean;
};

// Prepares screen state so the UI does not know any data-source details.
export class ObservationListViewModel {
  constructor(
    private readonly listObservationsUseCase: ListObservationsUseCase,
    private readonly listHousekeepingAreasUseCase: ListHousekeepingAreasUseCase,
  ) {}

  async load(): Promise<ObservationListViewState> {
    const [observations, areas] = await Promise.all([
      this.listObservationsUseCase.execute(),
      this.listHousekeepingAreasUseCase.execute(),
    ]);

    return {
      title: 'Housekeeping Observation List',
      subtitle: 'Daily room, assigned area, and issue tracking list',
      summary:
        'Managers can review open issues from all 8 housekeeping areas and discuss approved items during the housekeeping meeting.',
      facilityName: 'The Marlay',
      areaLabel: `${areas.length} housekeeping areas`,
      monthLabel: 'January 2026',
      dashboard: {
        total: observations.length,
        open: observations.filter((observation) => observation.status !== 'completed').length,
        urgent: observations.filter((observation) => observation.priority === 'urgent').length,
        completed: observations.filter((observation) => observation.status === 'completed').length,
        areas: areas.length,
      },
      areaCoverage: this.createAreaCoverage(areas, observations),
      observations,
      isLoading: false,
    };
  }

  private createAreaCoverage(
    areas: HousekeepingArea[],
    observations: Observation[],
  ): AreaCoverageItem[] {
    return areas.map((area) => ({
      id: area.id,
      name: area.name,
      floor: area.floorLabel,
      roomRange: `${area.roomRange.from}-${area.roomRange.to}`,
      observationCount: observations.filter((observation) => observation.areaId === area.id).length,
    }));
  }
}
