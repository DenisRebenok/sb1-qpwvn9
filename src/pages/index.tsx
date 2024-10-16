import { useState } from 'react'
import { FileUpload } from '@/components/FileUpload'
import { DataAnalysis } from '@/components/DataAnalysis'
import { WorkoutData } from '@/types'
import { Activity } from 'lucide-react'
import { ThemeToggle } from '@/components/ThemeToggle'

export default function Home() {
  const [workoutData, setWorkoutData] = useState<WorkoutData[]>([])

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold flex items-center">
            <Activity className="mr-2" /> Workout Data Analysis
          </h1>
          <ThemeToggle />
        </div>
        <FileUpload setWorkoutData={setWorkoutData} />
        {workoutData.length > 0 && (
          <div className="mt-8">
            <DataAnalysis workoutData={workoutData} />
          </div>
        )}
      </div>
    </div>
  )
}