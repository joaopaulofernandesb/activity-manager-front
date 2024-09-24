/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import {  useState } from 'react'
import { Activity, Clock, Calendar } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import axios from 'axios'

interface ActivityLog {
  nomeCard: string,
  id: number;
  name: string;
  duration: number; // Duração em segundos
  date: string;
}

// Função para formatar a duração em horas, minutos e segundos
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
    return today.toISOString().split('T')[0]; // Formato YYYY-MM-DD
  });

  // Função para buscar atividades da API
  const fetchActivities = async () => {
    if (!date) return; // Verificar se a data está selecionada

    try {
      const response = await axios.get(`https://activity-manager-ruby.vercel.app/api/activities?date=${date}`) // Substitua pela sua URL da API
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
    }
  }

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
          <div className="space-y-8">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                  ID do Card: {activity.nomeCard}
                  </p>
                  <p className="text-sm text-muted-foreground">atividade: {activity.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDuration(activity.duration)} on {activity.date}
                  </p>
                </div>
                <div className="ml-auto font-medium">Duração: {formatDuration(activity.duration)}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
