export interface User {
  id: number
  role: string
  password: string
  email: string
  firstName: string
  lastName: string
}

export interface Booking {
  id: string | number
  generatedFromRecurrentBookingWithId?: string | number
  createdAt: string
  meetingDate: string
  startTime: string
  endTime: string
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
