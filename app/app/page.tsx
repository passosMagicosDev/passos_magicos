import Calendar from "@/components/calendar";
import { prisma } from "@/lib/prisma";
import React from "react";
import { UserData } from "./layout";

interface Evento {
  id: number;
  nomeEvento: string;
  dataEvento: string | null;
  horaInicio: string | null;
  horaFim: string | null;
  categoriaEvento: string | null;
  localEvento: string | null;
  descricaoEvento: string | null;
  quantidadeDePessoas: number;
}

function formatarEvento(evento: Evento): any {
  if (!evento.dataEvento) return;

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
  const dia = dataObj.getDate() + 1;
  const mes = dataObj.getMonth() + 1;

  const formatted_data = `${nomeDia} - ${dia.toString().padStart(2, "0")}/${mes
    .toString()
    .padStart(2, "0")}`;

  const hora = `${evento.horaInicio} - ${evento.horaFim}`;

  return {
    idEvento: evento.id,
    mes: mes,
    dia: dia,
    title: evento.nomeEvento,
    formatted_data: formatted_data,
    hora: hora,
    local: evento.localEvento,
    desc: evento.descricaoEvento,
    categoria: evento.categoriaEvento,
    quantidadeDePessoas: evento.quantidadeDePessoas,
  };
}

async function getEventos(): Promise<any[]> {
  const eventos: Evento[] = await prisma.evento.findMany();

  if (!eventos) {
    throw new Error("Failed to fetch Eventos");
  }
  const eventosFormatados = eventos.map((evento) => formatarEvento(evento));
  return eventosFormatados;
}

async function App() {
  const eventos = await getEventos();
  return (
    <section>
      <div className="flex-1">
        <h1 className="text-xl text-[#333] p-5 bg-[#F2F2F2] w-full">
          Agenda de Voluntariado
        </h1>

        {/* <Calendar eventosDB={eventos} userData={userData} /> */}
      </div>
    </section>
  );
}

export default App;
