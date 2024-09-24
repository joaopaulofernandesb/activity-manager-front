'use client'

import { useState } from 'react'
import { Plus, Activity, Clock, Calendar } from 'lucide-react'
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

interface ActivityLog {
  id: number;
  name: string;
  duration: number;
  date: string;
}

export function ActivityTrackerComponent() {
  const [activities, setActivities] = useState<ActivityLog[]>([])
  const [newActivity, setNewActivity] = useState('')
  const [duration, setDuration] = useState('')

  const handleAddActivity = () => {
    if (newActivity && duration) {
      const activity: ActivityLog = {
        id: Date.now(),
        name: newActivity,
        duration: parseInt(duration),
        date: new Date().toISOString().split('T')[0]
      }
      setActivities([...activities, activity])
      setNewActivity('')
      setDuration('')
    }
  }

  const totalDuration = activities.reduce((sum, activity) => sum + activity.duration, 0)
  const averageDuration = activities.length ? totalDuration / activities.length : 0

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Activity Tracker</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input
              placeholder="Activity name"
              value={newActivity}
              onChange={(e) => setNewActivity(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Duration (minutes)"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
            <Button onClick={handleAddActivity}>
              <Plus className="mr-2 h-4 w-4" /> Add
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Activities</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activities.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Duration</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDuration} min</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Duration</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageDuration.toFixed(2)} min</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Activity Log</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">{activity.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {activity.duration} minutes on {activity.date}
                  </p>
                </div>
                <div className="ml-auto font-medium">{activity.duration} min</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}