import React from 'react';
import { Train, MapPin, Calendar, Users } from 'lucide-react';
import type { PNRStatus } from '../services/trainApi';

interface PNRStatusDisplayProps {
  status: PNRStatus;
}

export default function PNRStatusDisplay({ status }: PNRStatusDisplayProps) {
  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-8 mt-8">
      <div className="space-y-6">
        <div className="border-b pb-4">
          <div className="flex items-center space-x-3">
            <Train className="h-6 w-6 text-primary" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{status.trainName}</h2>
              <p className="text-gray-600">Train #{status.trainNumber}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Journey Details</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="font-semibold">{status.boardingPoint}</p>
                  <p className="text-sm text-gray-600">Boarding Point</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 text-secondary mt-1" />
                <div>
                  <p className="font-semibold">{status.destination}</p>
                  <p className="text-sm text-gray-600">Destination</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Booking Details</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <Calendar className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="font-semibold">{status.dateOfJourney}</p>
                  <p className="text-sm text-gray-600">Journey Date</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Users className="h-5 w-5 text-secondary mt-1" />
                <div>
                  <p className="font-semibold">{status.class}</p>
                  <p className="text-sm text-gray-600">Class</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold mb-4">Passenger Status</h3>
          <div className="space-y-4">
            {status.passengers.map((passenger, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Passenger {passenger.number}</p>
                  <p className="text-sm text-gray-600">Booking Status: {passenger.bookingStatus}</p>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      passenger.currentStatus.toLowerCase().includes('confirm')
                        ? 'bg-green-100 text-green-800'
                        : passenger.currentStatus.toLowerCase().includes('rac')
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {passenger.currentStatus}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Chart Status</p>
              <p className="font-medium">{status.chartStatus}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Expected Arrival</p>
              <p className="font-medium">{status.expectedArrival}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}