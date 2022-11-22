export interface User {
  id: number
  approved: boolean
  role: string
  email: string
  firstName: string
  lastName: string
  createdAt: string
}

export interface FetchingBooking {
  data: {
    bookings: Booking[]
    limit: number
    page: number
    totalCount: number
  }
}

export interface Booking {
  title: string
  daysOfWeek: number[]
  startDate: string
  endDate: string
  id: number,
  createdAt: string,
  isRecurring: boolean,
  meetingDate: string,
  startTime: string,
  endTime: string,
  room: Omit<Room, 'soonestBookings'>
  guests: User[]
  owner: User
}

export interface Room {
  id: string | number
  name: string
  floor: number
  devices: string[]
  maxPeople: number
  minPeople: number
  soonestBookings: Booking[]
}
