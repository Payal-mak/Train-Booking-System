import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import LiveTrainStatusForm from '../components/LiveTrainStatusForm';
import LiveTrainStatusDisplay from '../components/LiveTrainStatusDisplay';
import { getLiveTrainStatus } from '../services/trainApi';
import type { LiveTrainStatus } from '../services/trainApi';

export default function LiveStatus() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [trainStatus, setTrainStatus] = useState<LiveTrainStatus | null>(null);

  const handleSubmit = async (trainNo: string, startDay: number) => {
    setLoading(true);
    setError('');
    try {
      const status = await getLiveTrainStatus(trainNo, startDay);
      setTrainStatus(status);
    } catch (err) {
      setError('Failed to fetch train status. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Live Train Status</h1>
        <p className="mt-2 text-gray-600">Track your train's current location and status in real-time</p>
        <div className="mt-4 flex justify-center">
          <dotlottie-player 
            src="https://lottie.host/eba5bebf-a456-4945-b773-296598140b58/odbcK9vZYT.json" 
            background="transparent" 
            speed="1" 
            style={{ width: '300px', height: '300px' }} 
            loop 
            autoplay
          ></dotlottie-player>
        </div>
      </div>

      <LiveTrainStatusForm onSubmit={handleSubmit} isLoading={loading} />

      {loading && (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
          <span className="ml-2 text-gray-600">Fetching train status...</span>
        </div>
      )}

      {error && (
        <div className="max-w-2xl mx-auto mt-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      )}

      {trainStatus && !loading && <LiveTrainStatusDisplay status={trainStatus} />}
    </div>
  );
}