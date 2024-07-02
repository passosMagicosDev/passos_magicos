import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  console.log("GET EVENTOS ENTREI");

  try {
    const eventos: EventoPrisma[] = await prisma.evento.findMany({
      include: {
        inscritos: true,
      },
    });

    if (!eventos) {
      throw new Error("Failed to fetch Eventos");
    }

    const eventosFormatados = eventos
      .map((evento) => formatarEvento(evento))
      .filter((evento) => evento !== null) as FormattedEvento[];

    return NextResponse.json({ data: eventosFormatados }, { status: 200 });
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

function formatarEvento(evento: EventoPrisma): FormattedEvento | null {
  if (!evento.dataEvento) return null;

  const dataObj = new Date(
    Date.UTC(
      new Date(evento.dataEvento).getUTCFullYear(),
      new Date(evento.dataEvento).getUTCMonth(),
      new Date(evento.dataEvento).getUTCDate()
    )
  );

  const diasSemana = [
    "Domingo",
    "Segunda-Feira",
    "Terça-Feira",
    "Quarta-Feira",
    "Quinta-Feira",
    "Sexta-Feira",
    "Sábado",
  ];

  const nomeDia = diasSemana[dataObj.getUTCDay()];
  const dia = dataObj.getUTCDate();
  const mes = dataObj.getUTCMonth() + 1;

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
    local: String(evento.localEvento),
    desc: String(evento.descricaoEvento),
    categoria: String(evento.categoriaEvento),
    quantidadeDePessoas: Number(evento.quantidadeDePessoas),
    inscritos: evento.inscritos,
    criadorId: evento.criadorId,
  };
}

export interface Inscrito {
  id: number | null;
  eventoId: number | null;
  voluntarioId: number | null;
  nome: string | null;
  email: string | null;
  telefone: string | null;
}

export interface EventoPrisma {
  id: number;
  nomeEvento: string;
  dataEvento: string | null;
  horaInicio: string | null;
  horaFim: string | null;
  categoriaEvento: string | null;
  localEvento: string | null;
  areasAtuacao: string | null;
  quantidadeDePessoas: number | null;
  quantidadeVoluntarios: number | null;
  descricaoEvento: string | null;
  criadorId: number;
  inscritos: Inscrito[];
}

export interface FormattedEvento {
  idEvento: number;
  mes: number;
  dia: number;
  title: string;
  formatted_data: string;
  hora: string;
  local: string;
  desc: string;
  categoria: string;
  quantidadeDePessoas: number;
  inscritos: Inscrito[];
  criadorId: number;
}
