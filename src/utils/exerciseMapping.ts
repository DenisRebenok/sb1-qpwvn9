import config from '../config.json';

interface ExerciseGroup {
  Exercises: string[];
  Groups: string[];
}

const exerciseToMuscleGroups: { [key: string]: string[] } = {};

config["Muscle Groups"].forEach((group: ExerciseGroup) => {
  group.Exercises.forEach(exercise => {
    exerciseToMuscleGroups[exercise] = group.Groups;
  });
});

export function getMuscleGroups(exerciseName: string): string[] {
  return exerciseToMuscleGroups[exerciseName] || ['Uncategorized'];
}

export function getAllMuscleGroups(): string[] {
  return Array.from(new Set(Object.values(exerciseToMuscleGroups).flat()));
}