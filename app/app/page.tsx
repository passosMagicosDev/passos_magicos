import Calendar from "@/components/calendar";
import Navbar from "@/components/navbar";
import { prisma } from "@/lib/prisma";
import React from "react";

interface Evento {
  id: number;
  nomeEvento: string;
  dataEvento: string;
  horaInicio: string;
  horaFim: string;
  categoriaEvento: string;
  localEvento: string;
  descricaoEvento: string;
}

function formatarEvento(evento: Evento): any {
  const dataObj = new Date(evento.dataEvento);
  const diasSemana = [
    "Domingo",
    "Segunda-Feira",
    "Terça-Feira",
    "Quarta-Feira",
    "Quinta-Feira",
    "Sexta-Feira",
    "Sábado",
  ];
  const nomeDia = diasSemana[dataObj.getDay()];
  const dia = dataObj.getDate();
  const mes = dataObj.getMonth() + 1; // Meses são de 0 a 11, então adicionamos 1

  const formatted_data = `${nomeDia} - ${dia.toString().padStart(2, "0")}/${mes
    .toString()
    .padStart(2, "0")}`;

  const hora = `${evento.horaInicio} - ${evento.horaFim}`;

  return {
    mes: mes,
    dia: dia,
    title: evento.nomeEvento,
    formatted_data: formatted_data,
    hora: hora,
    local: evento.localEvento,
    desc: evento.descricaoEvento,
    categoria: evento.categoriaEvento,
  };
}

async function getEventos(): Promise<any[]> {
  const eventos: Evento[] = await prisma.evento.findMany();

  if (!eventos) {
    throw new Error("Failed to fetch Eventos");
  }

  // Mapeamos cada evento para o formato desejado
  const eventosFormatados = eventos.map((evento) => formatarEvento(evento));

  return eventosFormatados;
}

async function App() {
  const eventos = await getEventos();

  return (
    <main className="flex min-h-screen">
      <Navbar />
      <div className="flex-1">
        <h1 className="text-xl text-[#333] p-5 bg-[#F2F2F2] w-full">Início</h1>

        <Calendar eventosDB={eventos} />
      </div>
    </main>
  );
}

export default App;
