import prisma from "@/lib/prisma";
import { EventoCadastrado } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");

  try {
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const numericId = Number(id);
    if (isNaN(numericId)) {
      return NextResponse.json(
        { error: "ID must be a number" },
        { status: 400 }
      );
    }

    const eventos = await prisma.evento.findMany({
      where: {
        criadorId: numericId,
      },
      include: {
        inscritos: true,
      },
    });

    return NextResponse.json(formatarEvento(eventos), { status: 200 });
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export function formatarEvento(eventos: Evento[]): FormattedEvento[] {
  return eventos
    .map((evento) => {
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

      const formatted_data = `${nomeDia} - ${dia
        .toString()
        .padStart(2, "0")}/${mes.toString().padStart(2, "0")}`;

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
        inscritos: evento.inscritos,
      };
    })
    .filter((evento) => evento !== null) as FormattedEvento[];
}

export interface Inscrito {
  id: number | null;
  eventoId: number | null;
  voluntarioId: number | null;
  nome: string | null;
  email: string | null;
  telefone: string | null;
}

export interface Evento {
  id: number | null;
  nomeEvento: string | null;
  dataEvento: string | null;
  horaInicio: string | null;
  horaFim: string | null;
  categoriaEvento: string | null;
  localEvento: string | null;
  areasAtuacao: string | null;
  quantidadeDePessoas: number | null;
  quantidadeVoluntarios: number | null;
  descricaoEvento: string | null;
  criadorId: number | null;
  inscritos: Inscrito[];
}

export interface FormattedEvento {
  idEvento: number | null;
  mes: number;
  dia: number;
  title: string | null;
  formatted_data: string;
  hora: string | null;
  local: string | null;
  desc: string | null;
  categoria: string | null;
  quantidadeDePessoas: number | null;
}
