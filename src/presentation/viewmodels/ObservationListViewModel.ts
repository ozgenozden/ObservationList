import { HousekeepingArea } from '../../domain/entities/HousekeepingArea';
import { Observation } from '../../domain/entities/Observation';
import { ListHousekeepingAreasUseCase } from '../../application/usecases/ListHousekeepingAreasUseCase';
import { GetCurrentUserSessionUseCase } from '../../application/usecases/GetCurrentUserSessionUseCase';
import { ListVisibleObservationsUseCase } from '../../application/usecases/ListVisibleObservationsUseCase';
import { ObservationStatus } from '../../domain/entities/Observation';
import { UpdateObservationStatusUseCase } from '../../application/usecases/UpdateObservationStatusUseCase';

export type ObservationListSummary = {
  total: number;
  open: number;
  urgent: number;
  completed: number;
  areas: number;
};

export type RolePermissionSummary = {
  roleLabel: string;
  accessLabel: string;
  canSeeAllAreas: boolean;
  canFilter: boolean;
  canAddObservation: boolean;
  canUpdateStatus: boolean;
  statusOptions: ObservationStatus[];
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
  userName: string;
  roleLabel: string;
  permissionNote: string;
  areaLabel: string;
  monthLabel: string;
  dashboard: ObservationListSummary;
  permissions: RolePermissionSummary;
  areaCoverage: AreaCoverageItem[];
  observations: Observation[];
  isLoading: boolean;
};

// Prepares screen state so the UI does not know any data-source details.
export class ObservationListViewModel {
  constructor(
    private readonly getCurrentUserSessionUseCase: GetCurrentUserSessionUseCase,
    private readonly listVisibleObservationsUseCase: ListVisibleObservationsUseCase,
    private readonly listHousekeepingAreasUseCase: ListHousekeepingAreasUseCase,
    private readonly updateObservationStatusUseCase: UpdateObservationStatusUseCase,
  ) {}

  async load(): Promise<ObservationListViewState> {
    const session = await this.getCurrentUserSessionUseCase.execute();
    const [observations, areas] = await Promise.all([
      this.listVisibleObservationsUseCase.execute(session),
      this.listHousekeepingAreasUseCase.execute(),
    ]);
    const visibleAreas = this.filterVisibleAreas(areas, observations, session.user.role);

    return {
      title: 'Housekeeping Observation List',
      subtitle: 'Daily room, assigned area, and issue tracking list',
      summary: this.createSummary(session.user.role),
      facilityName: 'The Marlay',
      userName: session.user.displayName,
      roleLabel: this.createRoleLabel(session.user.role),
      permissionNote: this.createPermissionNote(session.user.role, visibleAreas),
      areaLabel: this.createAreaLabel(session.user.role, visibleAreas),
      monthLabel: 'January 2026',
      dashboard: {
        total: observations.length,
        open: observations.filter((observation) => observation.status !== 'completed').length,
        urgent: observations.filter((observation) => observation.priority === 'urgent').length,
        completed: observations.filter((observation) => observation.status === 'completed').length,
        areas: visibleAreas.length,
      },
      permissions: this.createPermissions(session.user.role),
      areaCoverage: this.createAreaCoverage(visibleAreas, observations),
      observations,
      isLoading: false,
    };
  }

  async previewStatusUpdate(
    observationId: string,
    nextStatus: ObservationStatus,
  ): Promise<Observation> {
    const session = await this.getCurrentUserSessionUseCase.execute();

    return this.updateObservationStatusUseCase.execute(session, observationId, nextStatus);
  }

  private createSummary(role: 'manager' | 'housekeeper'): string {
    if (role === 'manager') {
      return 'Managers can review every area, filter by date, area, or status, add observations, and close issues when they are resolved.';
    }

    return 'Housekeeping staff see only the area assigned for today. They can add observations and update status for their assigned area.';
  }

  private createRoleLabel(role: 'manager' | 'housekeeper'): string {
    return role === 'manager' ? 'Manager view' : 'Housekeeper view';
  }

  private createPermissionNote(role: 'manager' | 'housekeeper', areas: HousekeepingArea[]): string {
    if (role === 'manager') {
      return 'Full access: all areas, filters, new observations, and status updates.';
    }

    const areaName = areas[0]?.name ?? 'no assigned area';
    return `Restricted access: today you can work only in ${areaName}.`;
  }

  private createAreaLabel(role: 'manager' | 'housekeeper', areas: HousekeepingArea[]): string {
    if (role === 'manager') {
      return `${areas.length} housekeeping areas`;
    }

    return areas[0]?.name ?? 'No area assigned';
  }

  private createPermissions(role: 'manager' | 'housekeeper'): RolePermissionSummary {
    const canSeeAllAreas = role === 'manager';

    return {
      roleLabel: role === 'manager' ? 'Manager view' : 'Housekeeper view',
      accessLabel: canSeeAllAreas
        ? 'All areas, all observations'
        : 'Assigned area only',
      canSeeAllAreas,
      canFilter: canSeeAllAreas,
      canAddObservation: true,
      canUpdateStatus: true,
      statusOptions: ['open', 'inProgress', 'followUpNeeded', 'completed'],
    };
  }

  private filterVisibleAreas(
    areas: HousekeepingArea[],
    observations: Observation[],
    role: 'manager' | 'housekeeper',
  ): HousekeepingArea[] {
    if (role === 'manager') {
      return areas;
    }

    const visibleAreaIds = new Set(observations.map((observation) => observation.areaId));

    return areas.filter((area) => visibleAreaIds.has(area.id));
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
