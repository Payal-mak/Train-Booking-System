import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AlertCircle, Train as TrainIcon } from 'lucide-react';
import TrainList from '../components/TrainList';
import { trainRoutingService } from '../services/routingService';
import type { Train, Route } from '../types';

interface LocationState {
  fromStationCode: string;
  toStationCode: string;
  dateOfJourney: string;
  fromStationName: string;
  toStationName: string;
  displayDate: string;
}

export default function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const state = location.state as LocationState;

  useEffect(() => {
    const fetchRoutes = async () => {
      if (!state) {
        navigate('/');
        return;
      }

      try {
        setLoading(true);
        const foundRoutes = await trainRoutingService.findRoutes(
          state.fromStationCode,
          state.toStationCode,
          state.dateOfJourney
        );

        setRoutes(foundRoutes);
      } catch (err) {
        setError('Failed to fetch routes. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoutes();
  }, [state, navigate]);

  const handleTrainSelect = (train: Train) => {
    navigate('/booking', { state: { train } });
  };

  if (!state) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Available Routes</h1>
        <p className="mt-2 text-gray-600">
          {state.fromStationName} to {state.toStationName} • {new Date(state.displayDate).toLocaleDateString()}
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <dotlottie-player 
            src="https://lottie.host/439f135c-4e4f-4318-8317-ce89bb55b18b/iA0lMoZ71i.json" 
            background="transparent" 
            speed="1" 
            style={{ width: '300px', height: '300px' }} 
            loop 
            autoplay
          ></dotlottie-player>
          <span className="mt-4 text-gray-600">Finding the best routes...</span>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
          <AlertCircle className="h-5 w-5 text-red-400 mt-0.5" />
          <p className="ml-3 text-red-700">{error}</p>
        </div>
      ) : routes.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-700">No routes found for this journey on the selected date.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {routes.map((route, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6">
              <div className="mb-4">
                <div className="flex items-center space-x-2">
                  <TrainIcon className="h-5 w-5 text-primary" />
                  <span className="font-semibold">
                    {route.trains.length === 1 ? 'Direct Route' : `${route.trains.length} Connections`}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Total Duration: {Math.floor(route.totalDuration / 60)}h {route.totalDuration % 60}m
                  {' • '}
                  Total Price: ${route.totalPrice}
                </p>
              </div>

              <TrainList 
                trains={route.trains} 
                onSelect={handleTrainSelect}
                connectionTimes={route.connectionTimes}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}