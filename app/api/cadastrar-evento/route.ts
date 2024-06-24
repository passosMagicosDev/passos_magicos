import { NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

interface Evento {
  nomeEvento: string;
  dataEvento: string;
  horaInicio: string;
  horaFim: string;
  categoriaEvento: string;
  localEvento: string;
  descricaoEvento: string;
}

export async function POST(request: Request) {
  const data: Evento = await request.json();

  // Validações
  if (
    !data.nomeEvento ||
    !data.dataEvento ||
    !data.horaInicio ||
    !data.horaFim ||
    !data.categoriaEvento ||
    !data.localEvento ||
    !data.descricaoEvento
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
    await prisma.evento.create({
      data: data,
    });

    return NextResponse.json({ message: "Cadastrado com sucesso" });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        { error: "Erro de banco de dados" },
        { status: 500 }
      );
    }
    return NextResponse.json({ error: "Erro desconhecido" }, { status: 500 });
  }
}
