import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar } from 'lucide-react';
import { searchStations } from '../services/trainApi';
import type { Station } from '../services/trainApi';

export default function SearchForm() {
  const navigate = useNavigate();
  const [fromStation, setFromStation] = useState('');
  const [toStation, setToStation] = useState('');
  const [date, setDate] = useState('');
  const [fromStations, setFromStations] = useState<Station[]>([]);
  const [toStations, setToStations] = useState<Station[]>([]);
  const [selectedFromStation, setSelectedFromStation] = useState<Station | null>(null);
  const [selectedToStation, setSelectedToStation] = useState<Station | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const searchFromStations = async () => {
      if (fromStation.length >= 2) {
        try {
          const stations = await searchStations(fromStation);
          setFromStations(stations);
        } catch (error) {
          console.error('Error searching stations:', error);
        }
      } else {
        setFromStations([]);
      }
    };

    const timer = setTimeout(searchFromStations, 300);
    return () => clearTimeout(timer);
  }, [fromStation]);

  useEffect(() => {
    const searchToStations = async () => {
      if (toStation.length >= 2) {
        try {
          const stations = await searchStations(toStation);
          setToStations(stations);
        } catch (error) {
          console.error('Error searching stations:', error);
        }
      } else {
        setToStations([]);
      }
    };

    const timer = setTimeout(searchToStations, 300);
    return () => clearTimeout(timer);
  }, [toStation]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFromStation || !selectedToStation || !date) return;

    const searchParams = {
      fromStationCode: selectedFromStation.code,
      toStationCode: selectedToStation.code,
      dateOfJourney: date,
      fromStationName: selectedFromStation.name,
      toStationName: selectedToStation.name,
      displayDate: date,
    };

    navigate('/search', { state: searchParams });
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto glass-effect rounded-2xl shadow-2xl p-8 animate-slide-up">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative">
            <label htmlFor="from" className="block text-sm font-medium text-gray-700 mb-2">
              From
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="from"
                value={fromStation}
                onChange={(e) => setFromStation(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter city or station"
              />
            </div>
            {fromStations.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg">
                <ul className="max-h-60 overflow-auto">
                  {fromStations.map((station) => (
                    <li
                      key={station.code}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setSelectedFromStation(station);
                        setFromStation(station.name);
                        setFromStations([]);
                      }}
                    >
                      {station.name} ({station.code})
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="relative">
            <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-2">
              To
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="to"
                value={toStation}
                onChange={(e) => setToStation(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter city or station"
              />
            </div>
            {toStations.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg">
                <ul className="max-h-60 overflow-auto">
                  {toStations.map((station) => (
                    <li
                      key={station.code}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setSelectedToStation(station);
                        setToStation(station.name);
                        setToStations([]);
                      }}
                    >
                      {station.name} ({station.code})
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
              Date of Journey
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="date"
                id="date"
                min={today}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            disabled={!selectedFromStation || !selectedToStation || !date || loading}
            className="w-full bg-primary text-white py-3 px-6 rounded-md hover:bg-secondary transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Search className="h-5 w-5" />
            <span>Search Trains</span>
          </button>
        </div>
      </form>
      
      <div className="flex justify-center">
        <dotlottie-player 
          src="https://lottie.host/0499c368-8cbb-452c-9ea4-909e67149e38/SLZY8icI2q.json" 
          background="transparent" 
          speed="1" 
          style={{ width: '500px', height: '500px' }} 
          loop 
          autoplay
        ></dotlottie-player>
      </div>
    </div>
  );
}