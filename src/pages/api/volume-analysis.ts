import type { NextApiRequest, NextApiResponse } from 'next'
import { WorkoutData } from '@/types'
import { getFractionalVolume, getCustomDateRanges } from '@/utils/volumeCalculations'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const workoutData: WorkoutData[] = req.body.workoutData
    const dateRanges = getCustomDateRanges(workoutData)
    const volumeData = getFractionalVolume(workoutData, dateRanges)
    res.status(200).json({ volumeData, dateRanges })
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}