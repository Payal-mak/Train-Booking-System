import React from 'react';
import { Clock, Users, Train as TrainIcon, ArrowRight } from 'lucide-react';
import type { Train } from '../types';

interface TrainListProps {
  trains: Train[];
  onSelect: (train: Train) => void;
  connectionTimes?: number[];
}

export default function TrainList({ trains, onSelect, connectionTimes = [] }: TrainListProps) {
  return (
    <div className="space-y-6">
      {trains.map((train, index) => (
        <React.Fragment key={train.id}>
          <div 
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover-scale animate-slide-up glass-effect"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <TrainIcon className="h-6 w-6 text-primary animate-float" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{train.trainName || `Train ${train.trainNumber}`}</h3>
                    <p className="text-sm text-gray-500">Train #{train.trainNumber}</p>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                    <p className="text-sm text-gray-500">Departure</p>
                    <p className="font-semibold text-lg">{train.departureTime}</p>
                    <p className="text-sm text-gray-600">{train.from}</p>
                  </div>

                  <div className="flex items-center justify-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
                    <div className="text-center">
                      <Clock className="h-5 w-5 text-primary mx-auto animate-float" />
                      <p className="text-sm text-gray-500 mt-1">{train.duration}</p>
                      <div className="mt-2 flex items-center justify-center space-x-1">
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                        <div className="h-0.5 w-16 bg-primary"></div>
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                      </div>
                    </div>
                  </div>

                  <div className="text-right animate-fade-in" style={{ animationDelay: '0.4s' }}>
                    <p className="text-sm text-gray-500">Arrival</p>
                    <p className="font-semibold text-lg">{train.arrivalTime}</p>
                    <p className="text-sm text-gray-600">{train.to}</p>
                  </div>
                </div>
              </div>

              <div className="ml-6 text-right">
                <div className="text-3xl font-bold text-primary animate-fade-in" style={{ animationDelay: '0.5s' }}>
                  ${train.price}
                </div>
                <div className="flex items-center justify-end mt-2 text-sm text-gray-600 animate-fade-in" style={{ animationDelay: '0.6s' }}>
                  <Users className="h-4 w-4 mr-1" />
                  <span className="font-medium">{train.availableSeats} seats left</span>
                </div>
                <button
                  onClick={() => onSelect(train)}
                  className="mt-4 px-6 py-3 bg-primary text-white rounded-xl hover:bg-secondary transition-all duration-300 flex items-center justify-center space-x-2 group animate-pulse-shadow"
                >
                  <span>Book Now</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {connectionTimes[index] && (
            <div className="flex items-center justify-center py-4">
              <div className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-600">
                Connection Time: {Math.floor(connectionTimes[index] / 60)}h {connectionTimes[index] % 60}m
              </div>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}