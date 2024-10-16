import React, { useState } from 'react';
import { WorkoutData } from '../types';
import { calculate1RM, calculateRM, getBestSet } from '../utils/strengthCalculations';

interface StrengthAnalysisProps {
  workoutData: WorkoutData[];
}

export const StrengthAnalysis: React.FC<StrengthAnalysisProps> = ({ workoutData }) => {
  const [selectedExercise, setSelectedExercise] = useState<string>('');
  const [targetReps, setTargetReps] = useState<number>(1);

  const exerciseCounts = workoutData.reduce((acc: { [key: string]: number }, workout) => {
    acc[workout.exercise_title] = (acc[workout.exercise_title] || 0) + 1;
    return acc;
  }, {});

  const handleExerciseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedExercise(event.target.value);
  };

  const handleTargetRepsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTargetReps(parseInt(event.target.value, 10));
  };

  const bestSet = selectedExercise ? getBestSet(workoutData, selectedExercise) : null;
  const estimatedRM = bestSet
    ? calculateRM(selectedExercise, bestSet.weight_kg, bestSet.reps, targetReps)
    : null;

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Strength Analysis</h3>
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <select
          className="p-2 border rounded"
          value={selectedExercise}
          onChange={handleExerciseChange}
        >
          <option value="">Select an exercise</option>
          {Object.keys(exerciseCounts).map((exercise) => (
            <option key={exercise} value={exercise}>
              {exercise}
            </option>
          ))}
        </select>
        <input
          type="number"
          className="p-2 border rounded"
          value={targetReps}
          onChange={handleTargetRepsChange}
          min="1"
          max="20"
        />
        <button
          className="bg-blue-500 text-white p-2 rounded"
          onClick={() => setTargetReps(1)}
        >
          Calculate 1RM
        </button>
      </div>
      {bestSet && estimatedRM && (
        <div className="mt-4">
          <p>Best Set: {bestSet.weight_kg}kg x {bestSet.reps} reps</p>
          <p>Estimated {targetReps}RM: {estimatedRM.toFixed(2)}kg</p>
        </div>
      )}
    </div>
  );
};