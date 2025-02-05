import React from 'react';
import { Clock, MapPin, AlertTriangle } from 'lucide-react';
import type { LiveTrainStatus } from '../services/trainApi';

interface LiveTrainStatusDisplayProps {
  status: LiveTrainStatus;
}

export default function LiveTrainStatusDisplay({ status }: LiveTrainStatusDisplayProps) {
  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-8 mt-8">
      <div className="space-y-6">
        <div className="border-b pb-4">
          <h2 className="text-2xl font-bold text-gray-900">{status.trainName}</h2>
          <p className="text-gray-600">Train #{status.trainNumber}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Current Location</h3>
            <div className="flex items-start space-x-2">
              <MapPin className="h-5 w-5 text-primary mt-1" />
              <div>
                <p className="font-semibold">{status.currentStation}</p>
                <p className="text-sm text-gray-600">Last updated: {status.lastUpdated}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Next Station</h3>
            <div className="flex items-start space-x-2">
              <MapPin className="h-5 w-5 text-secondary mt-1" />
              <div>
                <p className="font-semibold">{status.nextStation}</p>
                <p className="text-sm text-gray-600">Expected: {status.expectedArrival}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-yellow-500" />
            <span className="font-medium">Delay: {status.delay}</span>
          </div>
          <div className="flex items-center space-x-2">
            <AlertTriangle className={`h-5 w-5 ${status.status === 'Running' ? 'text-green-500' : 'text-yellow-500'}`} />
            <span className="font-medium">{status.status}</span>
          </div>
        </div>
      </div>
    </div>
  );
}