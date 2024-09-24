"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Activity {
  _id: string;
  type: string;
  cardId: string;
}

export default function ActivityManager() {
  const [type, setType] = useState(""); // Tipo de atividade
  const [cardId, setCardId] = useState(""); // ID do Card
  const [activities, setActivities] = useState<Activity[]>([]); // Lista de atividades abertas
  const [message, setMessage] = useState(""); // Mensagem de feedback

  // Função para iniciar uma nova atividade
  const startActivity = async () => {
    try {
      const response = await axios.post("https://activity-manager-ruby.vercel.app/api/activities", {
        type,
        cardId,
      });
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
      await axios.put(`https://activity-manager-ruby.vercel.app/api/activities?id=${activityId}`);
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
  const fetchOpenActivities = async () => {
    try {
      const response = await axios.get("https://activity-manager-ruby.vercel.app/api/activitiesopen"); // Rota que busca atividades em aberto
      // Verifica se a resposta é um array, caso contrário, define como array vazio
      if (Array.isArray(response.data)) {
        setActivities(response.data);
      } else {
        setActivities([]); // Garante que activities seja sempre um array
      }
    } catch (error) {
      console.error("Erro ao carregar atividades em aberto", error);
      setMessage("Erro ao carregar atividades em aberto.");
    }
  };

  useEffect(() => {
    fetchOpenActivities();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
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

      {/* Atividades em Aberto */}
      <Card>
        <CardHeader>
          <CardTitle>Atividades em Aberto</CardTitle>
        </CardHeader>
        <CardContent>
          {activities.length > 0 ? (
            <ul className="space-y-2">
              {activities.map((activity) => (
                <li
                  key={activity._id}
                  className="flex justify-between items-center"
                >
                  <span>
                    {activity.type} - {activity.cardId}
                  </span>
                  <Button  variant="destructive" onClick={() => stopActivity(activity._id)}>
                    Encerrar
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">
              Nenhuma atividade em aberto.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
