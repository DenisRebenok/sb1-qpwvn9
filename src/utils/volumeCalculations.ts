import { WorkoutData } from '../types';
import { getMuscleGroups } from './exerciseMapping';

export function getVolumeBySets(workoutData: WorkoutData[], dateRanges: number[]): { [key: string]: { [key: number]: number } } {
  const now = new Date();
  const volumeData: { [key: string]: { [key: number]: number } } = {};

  workoutData.forEach((set) => {
    if (set.set_type === 'dropset' || set.set_type === 'warmup') return;

    const setDate = new Date(set.start_time);
    const daysSinceSet = Math.floor((now.getTime() - setDate.getTime()) / (1000 * 3600 * 24));

    const muscleGroups = getMuscleGroups(set.exercise_title);
    muscleGroups.forEach((muscleGroup) => {
      if (!volumeData[muscleGroup]) {
        volumeData[muscleGroup] = {};
      }

      dateRanges.forEach((range) => {
        if (daysSinceSet <= range) {
          volumeData[muscleGroup][range] = (volumeData[muscleGroup][range] || 0) + 1;
        }
      });
    });
  });

  return volumeData;
}

export function getCustomDateRanges(workoutData: WorkoutData[]): number[] {
  const now = new Date();
  const oldestWorkoutDate = new Date(Math.min(...workoutData.map(set => new Date(set.start_time).getTime())));
  const totalDays = Math.floor((now.getTime() - oldestWorkoutDate.getTime()) / (1000 * 3600 * 24));

  const ranges = [7, 14, 28];
  if (totalDays > 28) {
    ranges.push(Math.min(totalDays, 90));
  }
  if (totalDays > 90) {
    ranges.push(Math.min(totalDays, 180));
  }
  if (totalDays > 180) {
    ranges.push(totalDays);
  }

  return ranges;
}