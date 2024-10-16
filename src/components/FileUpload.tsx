import React, { useCallback } from 'react';
import { WorkoutData } from '../types';
import { Upload } from 'lucide-react';
import Papa from 'papaparse';

interface FileUploadProps {
  setWorkoutData: React.Dispatch<React.SetStateAction<WorkoutData[]>>;
}

export const FileUpload: React.FC<FileUploadProps> = ({ setWorkoutData }) => {
  const handleUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        complete: (results) => {
          const parsedData: WorkoutData[] = results.data.slice(1).map((row: any) => ({
            title: row.title || '',
            start_time: row.start_time || '',
            end_time: row.end_time || '',
            description: row.description || '',
            exercise_title: row.exercise_title || '',
            superset_id: row.superset_id || '',
            exercise_notes: row.exercise_notes || '',
            set_index: parseInt(row.set_index) || 0,
            set_type: row.set_type || '',
            weight_kg: parseFloat(row.weight_kg) || 0,
            reps: parseInt(row.reps) || 0,
            distance_km: parseFloat(row.distance_km) || 0,
            duration_seconds: parseInt(row.duration_seconds) || 0,
            rpe: parseInt(row.rpe) || 0,
          }));
          setWorkoutData(parsedData);
          console.log('Parsed data:', parsedData); // Add this line for debugging
        },
        header: true,
        skipEmptyLines: true,
      });
    }
  }, [setWorkoutData]);

  return (
    <div className="flex flex-col items-center">
      <label htmlFor="csv-upload" className="btn flex items-center cursor-pointer">
        <Upload className="mr-2" />
        Upload CSV
      </label>
      <input
        id="csv-upload"
        type="file"
        accept=".csv"
        onChange={handleUpload}
        className="hidden"
      />
    </div>
  );
};