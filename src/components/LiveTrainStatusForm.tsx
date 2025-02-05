import React, { useState } from 'react';
import { Search, AlertCircle } from 'lucide-react';

interface LiveTrainStatusFormProps {
  onSubmit: (trainNo: string, startDay: number) => void;
  isLoading: boolean;
}

export default function LiveTrainStatusForm({ onSubmit, isLoading }: LiveTrainStatusFormProps) {
  const [trainNo, setTrainNo] = useState('');
  const [startDay, setStartDay] = useState(1);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trainNo) {
      setError('Please enter a train number');
      return;
    }
    setError('');
    onSubmit(trainNo, startDay);
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
          <label htmlFor="trainNo" className="block text-sm font-medium text-gray-700 mb-2">
            Train Number
          </label>
          <input
            id="trainNo"
            type="text"
            value={trainNo}
            onChange={(e) => setTrainNo(e.target.value)}
            placeholder="Enter train number (e.g., 19038)"
            className="w-full px-4 py-2 border border-accent rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="startDay" className="block text-sm font-medium text-gray-700 mb-2">
            Start Day
          </label>
          <select
            id="startDay"
            value={startDay}
            onChange={(e) => setStartDay(Number(e.target.value))}
            className="w-full px-4 py-2 border border-accent rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value={0}>Yesterday</option>
            <option value={1}>Today</option>
            <option value={2}>Tomorrow</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary text-white py-3 px-6 rounded-md hover:bg-secondary transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Search className="h-5 w-5" />
          <span>Track Train</span>
        </button>
      </div>
    </form>
  );
}