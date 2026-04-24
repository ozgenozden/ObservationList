import type { HousekeepingArea } from '../../domain/entities/HousekeepingArea';
import type { HousekeepingAreaRepository } from '../../domain/repositories/HousekeepingAreaRepository';

const MARLAY_HOUSEKEEPING_AREAS: HousekeepingArea[] = [
  {
    id: 'grange-1',
    name: 'Grange 1',
    floorLabel: 'Ground Floor',
    roomRange: { from: 1, to: 22 },
  },
  {
    id: 'grange-2',
    name: 'Grange 2',
    floorLabel: 'Ground Floor',
    roomRange: { from: 23, to: 36 },
  },
  {
    id: 'whitechurch-1',
    name: 'Whitechurch 1',
    floorLabel: '1st Floor',
    roomRange: { from: 101, to: 122 },
  },
  {
    id: 'whitechurch-2',
    name: 'Whitechurch 2',
    floorLabel: '1st Floor',
    roomRange: { from: 123, to: 146 },
  },
  {
    id: 'ticknock',
    name: 'Ticknock',
    floorLabel: '1st Floor',
    roomRange: { from: 147, to: 176 },
  },
  {
    id: 'three-rock-1',
    name: 'Three Rock 1',
    floorLabel: '2nd Floor',
    roomRange: { from: 201, to: 222 },
  },
  {
    id: 'three-rock-2',
    name: 'Three Rock 2',
    floorLabel: '2nd Floor',
    roomRange: { from: 223, to: 246 },
  },
  {
    id: 'st-sabs',
    name: "St. Sab's",
    floorLabel: '2nd Floor',
    roomRange: { from: 247, to: 276 },
  },
];

export class InMemoryHousekeepingAreaRepository implements HousekeepingAreaRepository {
  // Local starter data mirrors the real Marlay housekeeping area split.
  async list(): Promise<HousekeepingArea[]> {
    return [...MARLAY_HOUSEKEEPING_AREAS];
  }
}
