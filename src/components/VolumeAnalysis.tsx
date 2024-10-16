import React, { useState } from 'react';
import { WorkoutData } from '../types';
import { getVolumeBySets, getCustomDateRanges } from '../utils/volumeCalculations';
import { getAllMuscleGroups } from '../utils/exerciseMapping';

interface VolumeAnalysisProps {
  workoutData: WorkoutData[];
}

export const VolumeAnalysis: React.FC<VolumeAnalysisProps> = ({ workoutData }) => {
  const [customRanges, setCustomRanges] = useState<number[]>([7, 14, 28]);
  const [newRange, setNewRange] = useState<string>('');

  const handleAddRange = () => {
    const days = parseInt(newRange, 10);
    if (!isNaN(days) && days > 0) {
      setCustomRanges([...customRanges, days].sort((a, b) => a - b));
      setNewRange('');
    }
  };

  const volumeData = getVolumeBySets(workoutData, customRanges);
  const muscleGroups = getAllMuscleGroups();

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Volume Analysis (Sets per Muscle Group)</h3>
      <div className="mb-4">
        <input
          type="number"
          value={newRange}
          onChange={(e) => setNewRange(e.target.value)}
          placeholder="Add custom range (days)"
          className="p-2 border rounded mr-2"
        />
        <button onClick={handleAddRange} className="bg-blue-500 text-white p-2 rounded">
          Add Range
        </button>
      </div>
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-2">Muscle Group</th>
            {customRanges.map((range) => (
              <th key={range} className="border p-2">{`${range} days`}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {muscleGroups.map((muscleGroup) => (
            <tr key={muscleGroup}>
              <td className="border p-2">{muscleGroup}</td>
              {customRanges.map((range) => (
                <td key={range} className="border p-2 text-center">
                  {volumeData[muscleGroup]?.[range] || 0}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};