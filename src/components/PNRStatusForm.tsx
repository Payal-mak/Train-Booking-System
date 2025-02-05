import React, { useState } from 'react';
import { Search, AlertCircle } from 'lucide-react';

interface PNRStatusFormProps {
  onSubmit: (pnr: string) => void;
  isLoading: boolean;
}

export default function PNRStatusForm({ onSubmit, isLoading }: PNRStatusFormProps) {
  const [pnr, setPNR] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pnr || pnr.length !== 10) {
      setError('Please enter a valid 10-digit PNR number');
      return;
    }
    setError('');
    onSubmit(pnr);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-8">
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center text-red-700">
          <AlertCircle className="h-5 w-5 mr-2" />
          {error}
        </div>
      )}

      <div className="space-y-6">
        <div>
          <label htmlFor="pnr" className="block text-sm font-medium text-gray-700 mb-2">
            PNR Number
          </label>
          <input
            id="pnr"
            type="text"
            value={pnr}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '').slice(0, 10);
              setPNR(value);
              setError('');
            }}
            placeholder="Enter 10-digit PNR number"
            className="w-full px-4 py-2 border border-accent rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            maxLength={10}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary text-white py-3 px-6 rounded-md hover:bg-secondary transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Search className="h-5 w-5" />
          <span>Check PNR Status</span>
        </button>
      </div>
    </form>
  );
}