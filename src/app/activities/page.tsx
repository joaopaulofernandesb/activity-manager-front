/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import {  Key, useEffect, useState } from 'react'

import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import axios from 'axios'

import {
  AlertCircle,
  Bug,
  Calendar,
  FlaskConical,
  Clock,
  Code,
  Flame,
  GitPullRequest,
  Monitor,
  PieChart,
  Users,
  Zap,
  BookOpen,
  Loader2,
  Activity,
} from "lucide-react";

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


  const getActivityIcon = (type: string) => {
    switch (type) {
      case "desenvolvimento":
        return <Code className="w-5 h-5" />;
      case "code review":
        return <GitPullRequest className="w-5 h-5" />;
      case "auxilio":
        return <Users className="w-5 h-5" />;
      case "daily":
        return <Calendar className="w-5 h-5" />;
      case "planning":
        return <PieChart className="w-5 h-5" />;
      case "reunião":
        return <Monitor className="w-5 h-5" />;
      case "teste":
        return <FlaskConical className="w-5 h-5" />;
      case "bug produção":
        return <AlertCircle className="w-5 h-5" />;
      case "story bug":
        return <Bug className="w-5 h-5" />;
      case "melhoria":
        return <Zap className="w-5 h-5" />;
      case "spike":
        return <BookOpen className="w-5 h-5" />;
      case "incidente":
        return <Flame className="w-5 h-5" />;
      default:
        return <AlertCircle className="w-5 h-5" />;
    }
  };
  
   const getActivityColor = (type: string) => {
    switch (type) {
      case "desenvolvimento":
        return "bg-blue-100 text-blue-600";
      case "code review":
        return "bg-green-100 text-green-600";
      case "auxilio":
        return "bg-yellow-100 text-yellow-600";
      case "daily":
        return "bg-orange-100 text-orange-600";
      case "planning":
        return "bg-pink-100 text-pink-600";
      case "reunião":
        return "bg-gray-100 text-gray-600";
      case "teste":
        return "bg-purple-100 text-purple-600";
      case "bug produção":
        return "bg-red-100 text-red-600";
      case "story bug":
        return "bg-red-200 text-red-700";
      case "melhoria":
        return "bg-teal-100 text-teal-600";
      case "spike":
        return "bg-indigo-100 text-indigo-600";
      case "incidente":
        return "bg-red-300 text-red-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

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
