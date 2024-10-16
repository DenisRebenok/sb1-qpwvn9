import { WorkoutData } from '../types';
import { getMuscleGroups, getAllMuscleGroups } from './exerciseMapping';

export function getLastTrainedDates(workoutData: WorkoutData[]): { [key: string]: string } {
  const lastTrainedDates: { [key: string]: Date } = {};
  const now = new Date();

  workoutData.forEach((set) => {
    if (set.set_type === 'dropset' || set.set_type === 'warmup') return;

    const setDate = new Date(set.start_time);
    const muscleGroups = getMuscleGroups(set.exercise_title);

    muscleGroups.forEach((muscleGroup) => {
      if (!lastTrainedDates[muscleGroup] || setDate > lastTrainedDates[muscleGroup]) {
        lastTrainedDates[muscleGroup] = setDate;
      }
    });
  });

  const allMuscleGroups = getAllMuscleGroups();
  const formattedLastTrainedDates: { [key: string]: string } = {};

  allMuscleGroups.forEach((muscleGroup) => {
    const lastTrainedDate = lastTrainedDates[muscleGroup];
    if (lastTrainedDate) {
      const timeDiff = now.getTime() - lastTrainedDate.getTime();
      const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
      const hoursDiff = Math.floor((timeDiff % (1000 * 3600 * 24)) / (1000 * 3600));

      if (daysDiff > 0) {
        formattedLastTrainedDates[muscleGroup] = `${daysDiff} day${daysDiff > 1 ? 's' : ''} ago`;
      } else {
        formattedLastTrainedDates[muscleGroup] = `${hoursDiff} hour${hoursDiff > 1 ? 's' : ''} ago`;
      }
    } else {
      formattedLastTrainedDates[muscleGroup] = 'Not trained yet';
    }
  });

  return formattedLastTrainedDates;
}