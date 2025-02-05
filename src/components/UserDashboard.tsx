import React from 'react';
import { User, Package, Settings } from 'lucide-react';
import type { Booking, User as UserType } from '../types';

interface UserDashboardProps {
  user: UserType;
  onUpdateProfile: (user: Partial<UserType>) => void;
}

export default function UserDashboard({ user, onUpdateProfile }: UserDashboardProps) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: user.name,
    email: user.email,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(formData);
    setIsEditing(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Section */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-4 mb-6">
              <User className="h-12 w-12 text-indigo-600" />
              <div>
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>
            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700"
              >
                <Settings className="h-4 w-4" />
                <span>Edit Profile</span>
              </button>
            )}
          </div>
        </div>

        {/* Bookings Section */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-6">Recent Bookings</h2>
            <div className="space-y-4">
              {user.bookings.map((booking) => (
                <div key={booking.id} className="border-b border-gray-200 pb-4 last:border-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center space-x-2">
                        <Package className="h-5 w-5 text-indigo-600" />
                        <span className="font-semibold">Booking #{booking.id}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {booking.bookingDate}
                      </p>
                      <p className="text-sm text-gray-600">
                        {booking.passengers.length} passenger(s)
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize"
                        style={{
                          backgroundColor: booking.status === 'confirmed' ? 'rgb(220 252 231)' : 'rgb(254 242 242)',
                          color: booking.status === 'confirmed' ? 'rgb(22 101 52)' : 'rgb(153 27 27)',
                        }}
                      >
                        {booking.status}
                      </span>
                      <p className="mt-1 font-bold">${booking.totalPrice}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}