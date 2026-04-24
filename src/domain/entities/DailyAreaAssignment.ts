// Connects a housekeeper to the area they are allowed to work on for one day.
export interface DailyAreaAssignment {
  id: string;
  userId: string;
  areaId: string;
  assignedDate: Date;
}
