import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import PNRStatusForm from '../components/PNRStatusForm';
import PNRStatusDisplay from '../components/PNRStatusDisplay';
import { getPNRStatus } from '../services/trainApi';
import type { PNRStatus } from '../services/trainApi';

export default function PNRStatus() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [pnrStatus, setPNRStatus] = useState<PNRStatus | null>(null);

  const handleSubmit = async (pnr: string) => {
    setLoading(true);
    setError('');
    try {
      const status = await getPNRStatus(pnr);
      setPNRStatus(status);
    } catch (err) {
      setError('Failed to fetch PNR status. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">PNR Status</h1>
        <p className="mt-2 text-gray-600">Check your booking status using PNR number</p>
        <div className="mt-4 flex justify-center">
          <dotlottie-player 
            src="https://lottie.host/702a338d-cc47-45cc-bdbb-0f23d85ce27e/TcmviKt37D.json" 
            background="transparent" 
            speed="1" 
            style={{ width: '200px', height: '200px' }} 
            loop 
            autoplay
          ></dotlottie-player>
        </div>
      </div>

      <PNRStatusForm onSubmit={handleSubmit} isLoading={loading} />

      {loading && (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
          <span className="ml-2 text-gray-600">Fetching PNR status...</span>
        </div>
      )}

      {error && (
        <div className="max-w-2xl mx-auto mt-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      )}

      {pnrStatus && !loading && <PNRStatusDisplay status={pnrStatus} />}
    </div>
  );
}