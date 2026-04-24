// Represents one named housekeeping checklist area in The Marlay.
export interface HousekeepingArea {
  id: string;
  name: string;
  floorLabel: string;
  roomRange: {
    from: number;
    to: number;
  };
}

