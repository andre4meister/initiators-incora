export interface User {
  id: number;
  approved: boolean;
  role: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
}

export interface FetchingBooking {
  data: {
    bookings: OneTimeBooking[];
    limit: number;
    page: number;
    totalCount: number;
  };
}

export interface OneTimeBooking {
  id: number;
  createdAt: string;
  isRecurring: boolean;
  meetingDate: string;
  startTime: string;
  endTime: string;
  tttle: string;
  room: Omit<Room, 'soonestBookings'>;
  guests: User[];
  owner: User;
}

export interface OneTimeBookingCreateResponse {
  id: number;
  createdAt: string;
  meetingDate: string;
  startTime: string;
  endTime: string;
  tttle: string;
  room: Pick<Room, 'id'>;
  owner: Pick<User, 'id'>;
}
export interface RecurringBookingCreateResponse {
  id: number;
  createdAt: string;
  startDate: string;
  endDate: string;
  daysOfWeek: number[];
  startTime: string;
  endTime: string;
  tttle: string;
  room: Pick<Room, 'id'>;
  owner: Pick<User, 'id'>;
}

export interface Room {
  id: string | number;
  name: string;
  floor: number;
  devices: string[];
  maxPeople: number;
  minPeople: number;
  soonestBookings: OneTimeBooking[];
}
