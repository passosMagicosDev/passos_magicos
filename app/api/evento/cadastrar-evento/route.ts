import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";

interface EventoFront {
  id: number;
  nomeEvento: string;
  dataEvento: string | null;
  horaInicio: string | null;
  horaFim: string | null;
  categoriaEvento: string | null;
  localEvento: string | null;
  areasAtuacao: string | null;
  quantidadeDePessoas: number;
  quantidadeVoluntarios: number;
  descricaoEvento: string | null;
  criadorId: number;
}

export async function POST(request: Request) {
  const data: EventoFront = await request.json();
  console.log("CADASTRAR EVENTO ENTREI");
  // Validações
  if (
    !data.nomeEvento ||
    !data.dataEvento ||
    !data.horaInicio ||
    !data.horaFim ||
    !data.categoriaEvento ||
    !data.localEvento ||
    !data.descricaoEvento ||
    !data.quantidadeDePessoas ||
    !data.areasAtuacao
  ) {
    return NextResponse.json(
      { error: "Todos os campos são obrigatórios" },
      { status: 400 }
    );
  }

  if (data.horaInicio >= data.horaFim) {
    return NextResponse.json(
      { error: "Hora de início deve ser menor que hora de fim" },
      { status: 400 }
    );
  }

  try {
    const eventoData = await prisma.evento.create({
      data: {
        ...data,
        quantidadeVoluntarios: Number(data.quantidadeVoluntarios),
        quantidadeDePessoas: Number(data.quantidadeDePessoas),
      },
    });

    const evento = await prisma.evento.findMany({
      where: {
        id: eventoData.id,
      },
      include: {
        inscritos: true,
      },
    });
    const eventoFormated = formatarEvento(evento);
    return NextResponse.json({
      message: "Cadastrado com sucesso",
      evento: eventoFormated,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        { error: "Erro de banco de dados" },
        { status: 500 }
      );
    }
    return NextResponse.json({ error: "Erro desconhecido" }, { status: 500 });
  }
}

function formatarEvento(
  eventos: (Evento & { inscritos: Inscrito[] })[]
): FormattedEvento[] {
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

      const hora = `${evento.horaInicio || ""} - ${evento.horaFim || ""}`;

      return {
        idEvento: evento.id || null,
        mes: mes,
        dia: dia,
        title: evento.nomeEvento || null,
        formatted_data: formatted_data,
        hora: hora.trim() || null,
        local: evento.localEvento || null,
        desc: evento.descricaoEvento || null,
        categoria: evento.categoriaEvento || null,
        quantidadeDePessoas: evento.quantidadeDePessoas || null,
        inscritos: evento.inscritos,
      };
    })
    .filter((evento): evento is FormattedEvento => evento !== null);
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
  inscritos: [];
}
