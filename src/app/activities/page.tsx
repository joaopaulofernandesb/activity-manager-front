/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import {  Key, useEffect, useState } from 'react'
import { Activity, Clock, Calendar, Loader2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import axios from 'axios'
import { getActivityColor, getActivityIcon } from '../page'

interface ActivityLog {
  _id: Key | null | undefined;
  startTime: string | number | Date
  cardId: string;
  type: string;
  nomeCard: string,
  id: number;
  name: string;
  duration: number; 
  date: string;
}


const formatDuration = (duration: number) => {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;

  let formattedDuration = '';
  if (hours > 0) formattedDuration += `${hours}h `;
  if (minutes > 0 || hours > 0) formattedDuration += `${minutes}m `;
  formattedDuration += `${seconds}s`;

  return formattedDuration;
};

export default function ActivityTracker() {
  const [activities, setActivities] = useState<ActivityLog[]>([])
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [loading, setLoading] = useState(false);

  const fetchActivities = async (date?:any) => {
    if (!date) return;

    try {
      setLoading(true)
      const response = await axios.get(`https://activity-manager-ruby.vercel.app/api/activities?date=${date}`)
      const fetchedActivities = response.data.map((activity: any) => ({
        id: activity._id,
        name: activity.type,
        nomeCard: activity.cardId,
        duration: activity.duration,
        date: activity.startTime.split('T')[0]
      }));
      setActivities(fetchedActivities)
    } catch (error) {
      console.error('Erro ao buscar atividades', error);
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchActivities(date)
  },[date])

  const totalDuration = activities.reduce((sum, activity) => sum + activity.duration, 0)
  const averageDuration = activities.length ? totalDuration / activities.length : 0

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6 container mx-auto p-6 bg-background text-foreground min-h-screen">
      <Card>
        <CardHeader>
          <CardTitle>Activity Tracker</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)} 
              placeholder="Selecione a data"
            />
            <Button onClick={fetchActivities}>
              Buscar Atividades
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
            <div className="text-2xl font-bold">{formatDuration(totalDuration)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Duration</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatDuration(Math.floor(averageDuration))}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Activity Log</CardTitle>
        </CardHeader>
        <CardContent>
        {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin w-8 h-8 text-gray-600" />
        </div>
      )  : null}
        <div className="space-y-4">
        {activities.map((activity) => (
          <Card
            key={activity.id}
            className="overflow-hidden hover:shadow-md transition-shadow duration-300"
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 bg-secondary ${getActivityColor(
                      activity.name
                    )}`}
                  >
                    {getActivityIcon(activity.name)}
                  </div>
                  <div>
                    <span className="font-medium text-sm">{activity.name.toUpperCase()}</span>
                    <p className="text-xs text-muted-foreground mt-1">
                      {activity.nomeCard}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-xs text-muted-foreground flex items-center mr-4">
                    <Clock className="w-3 h-3 mr-1" />
                    {formatDuration(activity.duration)}
                  </span>
                 
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
        </CardContent>
      </Card>

     
    </div>
  )
}
