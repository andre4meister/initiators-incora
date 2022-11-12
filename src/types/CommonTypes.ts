export type DateTimeType = moment.Moment | string;
export interface OfficeType {
  id: number;
  name: string;
  adress: string;
}

export interface CommonMeetingType {
  id: number;
  createdAt: string;
  meetingDate: string;
  startTime: string;
  endTime: string;
  isRecurring?: boolean;
}

export type DevicesType =
  | 'White board'
  | 'Big screen'
  | 'Water cooler'
  | 'PlayStation'
  | 'Air conditioner'
  | 'Sound system'
  | 'Tennis table'
  | 'Camera';

export interface RoomType {
  id: number;
  name: string;
  floor: number;
  maxPeople: number;
  minPeople: number;
  soonestBookings: CommonMeetingType[];
  devices: DevicesType[];
}
