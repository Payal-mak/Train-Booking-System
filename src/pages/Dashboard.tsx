import React from 'react';
import UserDashboard from '../components/UserDashboard';
import type { User } from '../types';

const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  bookings: [
    {
      id: 'B001',
      trainId: '1',
      userId: '1',
      passengers: [{ name: 'John Doe', age: 30 }],
      totalPrice: 89,
      status: 'confirmed',
      bookingDate: '2024-03-15',
    },
    {
      id: 'B002',
      trainId: '2',
      userId: '1',
      passengers: [
        { name: 'John Doe', age: 30 },
        { name: 'Jane Doe', age: 28 },
      ],
      totalPrice: 150,
      status: 'pending',
      bookingDate: '2024-03-20',
    },
  ],
};

export default function Dashboard() {
  const handleProfileUpdate = (userData: Partial<User>) => {
    // Handle profile update
    console.log('Profile updated:', userData);
  };

  return (
    <UserDashboard user={mockUser} onUpdateProfile={handleProfileUpdate} />
  );
}