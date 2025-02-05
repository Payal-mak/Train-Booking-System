export interface Train {
  id: string;
  trainNumber: string;
  trainName: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  availableSeats: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  bookings: Booking[];
}

export interface Booking {
  id: string;
  trainId: string;
  userId: string;
  passengers: Passenger[];
  totalPrice: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  bookingDate: string;
}

export interface Passenger {
  name: string;
  age: number;
  seatNumber?: string;
}

export interface Route {
  trains: Train[];
  totalDuration: number;
  totalPrice: number;
  connectionTimes: number[];
}