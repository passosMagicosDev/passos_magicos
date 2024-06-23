import { NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";
import { hash } from "bcrypt";

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

  try {
    await prisma.evento.create({
      data: data,
    });

    return NextResponse.json({ message: "Cadastrado com sucesso" });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
