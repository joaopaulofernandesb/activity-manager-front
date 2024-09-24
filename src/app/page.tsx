"use client";

import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
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
  X,
  Zap,
  BookOpen,
  Loader2,
} from "lucide-react";

interface Activity {
  startTime: string;
  _id: string;
  type: string;
  cardId: string;
}

export default function ActivityManager() {
  const [type, setType] = useState(""); // Tipo de atividade
  const [cardId, setCardId] = useState(""); // ID do Card
  const [activities, setActivities] = useState<Activity[]>([]); // Lista de atividades abertas
  const [message, setMessage] = useState(""); // Mensagem de feedback
  const [loading, setLoading] = useState(false);

  // Função para iniciar uma nova atividade
  const startActivity = async () => {
    try {
      const response = await axios.post(
        "https://activity-manager-ruby.vercel.app/api/activities",
        {
          type,
          cardId,
        }
      );
      if (response.data) {
        setActivities((prevActivities) => [...prevActivities, response.data]); // Adicionar nova atividade à lista de atividades abertas
        setMessage(`Atividade iniciada: ${response.data._id}`);
      }
    } catch (error) {
      console.log("Erro ao iniciar a atividade", error);
      setMessage("Erro ao iniciar a atividade.");
    }
  };

  // Função para parar uma atividade específica
  const stopActivity = async (activityId: string) => {
    try {
      await axios.put(
        `https://activity-manager-ruby.vercel.app/api/activities?id=${activityId}`
      );
      setActivities((prevActivities) =>
        prevActivities.filter((activity) => activity._id !== activityId)
      ); // Remover atividade da lista de abertas
      setMessage("Atividade encerrada.");
    } catch (error) {
      console.error("Erro ao parar a atividade", error);
      setMessage("Erro ao parar a atividade.");
    }
  };

  // Carregar atividades em aberto ao montar o componente
  // Carregar atividades em aberto ao montar o componente
  const fetchOpenActivities = async () => {
    try {
      setLoading(true); // Inicia o carregamento
      const response = await axios.get(
        "https://activity-manager-ruby.vercel.app/api/activitiesopen"
      ); // Rota que busca atividades em aberto
      // Verifica se a resposta é um array, caso contrário, define como array vazio
      if (Array.isArray(response.data)) {
        setActivities(response.data);
      } else {
        setActivities([]); // Garante que activities seja sempre um array
      }
    } catch (error) {
      console.error("Erro ao carregar atividades em aberto", error);
      setMessage("Erro ao carregar atividades em aberto.");
    } finally {
      setLoading(false); // Finaliza o carregamento
    }
  };

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

  useEffect(() => {
    fetchOpenActivities();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6 container mx-auto p-6 bg-background text-foreground min-h-screen">
      <Card>
        <CardHeader>
          <CardTitle>Gerenciador de Atividades</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0 md:items-end">
            {/* Tipo de Atividade */}
            <div className="flex flex-col w-full md:w-1/3">
              <label className="mb-1">Tipo de Atividade:</label>

              <Select
                value={type}
                onValueChange={(value) => setType(value)} // O Select do ShadCN UI usa "onValueChange" em vez de "onChange"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo de atividade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="desenvolvimento">
                    Desenvolvimento
                  </SelectItem>
                  <SelectItem value="code review">Code Review</SelectItem>
                  <SelectItem value="auxilio">Auxílio a outro Dev</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="planning">Planning</SelectItem>
                  <SelectItem value="reunião">Reunião</SelectItem>
                  <SelectItem value="teste">Teste</SelectItem>
                  <SelectItem value="bug produção">Bug Produção</SelectItem>
                  <SelectItem value="story bug">Story Bug</SelectItem>
                  <SelectItem value="melhoria">Melhoria</SelectItem>
                  <SelectItem value="spike">Spike</SelectItem>
                  <SelectItem value="incidente">Incidente</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* ID do Card */}
            <div className="flex flex-col w-full md:w-1/3">
              <label className="mb-1">ID do Card:</label>
              <Input
                value={cardId}
                onChange={(e) => setCardId(e.target.value)}
                placeholder="Referência do card ou PR"
              />
            </div>

            {/* Botões */}
            <div className="flex flex-col w-full md:w-auto md:flex-row md:space-x-2">
              <Button
                onClick={startActivity}
                disabled={!type || !cardId}
                className="w-full md:w-auto"
              >
                Iniciar Atividade
              </Button>
            </div>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">{message}</p>
        </CardContent>
      </Card>

      {/* Indicador de loading */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin w-8 h-8 text-gray-600" />
        </div>
      ) : activities.length > 0 ? (
        <div
          className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4"
          role="alert"
        >
          <div className="flex">
            <AlertCircle className="h-6 w-6 mr-2" />
            <p>Você tem {activities.length} atividade(s) em aberto.</p>
          </div>
        </div>
      ) : null}

      <div className="space-y-4">
        {activities.map((activity) => (
          <Card
            key={activity._id}
            className="overflow-hidden hover:shadow-md transition-shadow duration-300"
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 bg-secondary ${getActivityColor(
                      activity.type
                    )}`}
                  >
                    {getActivityIcon(activity.type)}
                  </div>
                  <div>
                    <span className="font-medium text-sm">{activity.type}</span>
                    <p className="text-xs text-muted-foreground mt-1">
                      {activity.cardId}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-xs text-muted-foreground flex items-center mr-4">
                    <Clock className="w-3 h-3 mr-1" />
                    {new Date(activity.startTime).toLocaleString("pt-BR", {
                      timeZone: "UTC",
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </span>
                  <Button
                    onClick={() => stopActivity(activity._id)}
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors duration-200 rounded-full p-1 h-8 w-8"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
