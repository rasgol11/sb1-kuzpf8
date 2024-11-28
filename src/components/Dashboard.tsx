import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useStore } from '../store/useStore';
import { Activity } from 'lucide-react';
import { Recommendations } from './Recommendations';
import type { DailyLog } from '../types/assessment';

export function Dashboard() {
  const { dailyLogs, assessment, addDailyLog } = useStore();
  const [formData, setFormData] = useState({
    dryness: 5,
    discomfort: 5,
    notes: ''
  });

  if (!assessment) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newLog: DailyLog = {
      date: new Date().toISOString().split('T')[0],
      dryness: Number(formData.dryness),
      discomfort: Number(formData.discomfort),
      notes: formData.notes
    };

    addDailyLog(newLog);
    
    // Reset form
    setFormData({
      dryness: 5,
      discomfort: 5,
      notes: ''
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <Activity className="w-6 h-6 mr-2 text-blue-500" />
          Symptomuppföljning
        </h2>
        
        <div className="h-[300px] mt-6">
          {dailyLogs.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyLogs}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 10]} />
                <Tooltip />
                <Line type="monotone" dataKey="dryness" name="Torrhet" stroke="#3b82f6" />
                <Line type="monotone" dataKey="discomfort" name="Obehag" stroke="#ef4444" />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              Ingen data tillgänglig än. Börja logga dina symptom nedan.
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Recommendations assessment={assessment} />

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Daglig Logg</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Torrhetsnivå (1-10)
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={formData.dryness}
                onChange={(e) => setFormData(prev => ({ ...prev, dryness: e.target.value }))}
                className="mt-1 block w-full"
              />
              <div className="text-center mt-1">{formData.dryness}</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Obehagsnivå (1-10)
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={formData.discomfort}
                onChange={(e) => setFormData(prev => ({ ...prev, discomfort: e.target.value }))}
                className="mt-1 block w-full"
              />
              <div className="text-center mt-1">{formData.discomfort}</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Anteckningar
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows={3}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Logga Dagens Symptom
            </button>
          </form>

          {dailyLogs.length > 0 && (
            <div className="mt-6">
              <h4 className="font-medium mb-2">Senaste Loggar</h4>
              <div className="space-y-2">
                {dailyLogs.slice(-3).reverse().map((log) => (
                  <div key={log.date} className="text-sm p-2 bg-gray-50 rounded">
                    <div className="font-medium">{log.date}</div>
                    <div className="text-gray-600">
                      Torrhet: {log.dryness} • Obehag: {log.discomfort}
                    </div>
                    {log.notes && <div className="text-gray-500 mt-1">{log.notes}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}