import React, { useState } from 'react';
import { WorkoutData } from '../types';
import { VolumeAnalysis } from './VolumeAnalysis';
import { StrengthAnalysis } from './StrengthAnalysis';
import { LastTrainedAnalysis } from './LastTrainedAnalysis';

interface DataAnalysisProps {
  workoutData: WorkoutData[];
}

export const DataAnalysis: React.FC<DataAnalysisProps> = ({ workoutData }) => {
  const [activeTab, setActiveTab] = useState<'volume' | 'strength' | 'lastTrained'>('volume');

  return (
    <div className="card">
      <div className="flex mb-4 space-x-2">
        <button
          className={`btn ${activeTab === 'volume' ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
          onClick={() => setActiveTab('volume')}
        >
          Volume Analysis
        </button>
        <button
          className={`btn ${activeTab === 'strength' ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
          onClick={() => setActiveTab('strength')}
        >
          Strength Analysis
        </button>
        <button
          className={`btn ${activeTab === 'lastTrained' ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
          onClick={() => setActiveTab('lastTrained')}
        >
          Last Trained
        </button>
      </div>
      {activeTab === 'volume' && <VolumeAnalysis workoutData={workoutData} />}
      {activeTab === 'strength' && <StrengthAnalysis workoutData={workoutData} />}
      {activeTab === 'lastTrained' && <LastTrainedAnalysis workoutData={workoutData} />}
    </div>
  );
};