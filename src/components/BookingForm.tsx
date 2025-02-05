import React, { useState } from 'react';
import { User, CreditCard } from 'lucide-react';
import type { Train, Passenger } from '../types';

interface BookingFormProps {
  train: Train;
  onSubmit: (passengers: Passenger[]) => void;
}

export default function BookingForm({ train, onSubmit }: BookingFormProps) {
  const [passengers, setPassengers] = useState<Passenger[]>([{ name: '', age: 0 }]);

  const addPassenger = () => {
    setPassengers([...passengers, { name: '', age: 0 }]);
  };

  const updatePassenger = (index: number, field: keyof Passenger, value: string | number) => {
    const newPassengers = [...passengers];
    newPassengers[index] = { ...newPassengers[index], [field]: value };
    setPassengers(newPassengers);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(passengers);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Booking Details</h2>
        <div className="mt-4 p-4 bg-indigo-50 rounded-md">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold">{train.from} → {train.to}</p>
              <p className="text-sm text-gray-600">Departure: {train.departureTime}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-indigo-600">${train.price}</p>
              <p className="text-sm text-gray-600">per passenger</p>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {passengers.map((passenger, index) => (
          <div key={index} className="mb-6 p-4 border border-gray-200 rounded-md">
            <h3 className="text-lg font-semibold mb-4">Passenger {index + 1}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={passenger.name}
                  onChange={(e) => updatePassenger(index, 'name', e.target.value)}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Age</label>
                <input
                  type="number"
                  value={passenger.age || ''}
                  onChange={(e) => updatePassenger(index, 'age', parseInt(e.target.value))}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-between items-center mt-6">
          <button
            type="button"
            onClick={addPassenger}
            className="text-indigo-600 hover:text-indigo-700 font-medium"
          >
            + Add Another Passenger
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center"
          >
            <CreditCard className="h-5 w-5 mr-2" />
            Proceed to Payment
          </button>
        </div>
      </form>
    </div>
  );
}