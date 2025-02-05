import React from 'react';
import BookingForm from '../components/BookingForm';
import type { Train, Passenger } from '../types';

const mockTrain: Train = {
  id: '1',
  from: 'New York',
  to: 'Boston',
  departureTime: '09:00 AM',
  arrivalTime: '01:00 PM',
  price: 89,
  availableSeats: 42,
};

export default function Booking() {
  const handleBookingSubmit = (passengers: Passenger[]) => {
    // Handle booking submission
    console.log('Booking submitted:', passengers);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Complete Your Booking</h1>
      <BookingForm train={mockTrain} onSubmit={handleBookingSubmit} />
    </div>
  );
}