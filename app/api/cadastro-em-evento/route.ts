import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { idEvento, idVoluntario } = await request.json();

    // Verificar se idEvento e idVoluntario são fornecidos
    if (!idEvento || !idVoluntario) {
      return NextResponse.json(
        { error: "idEvento e idVoluntario são obrigatórios." },
        { status: 400 }
      );
    }

    // Verificar se o evento existe
    const evento = await prisma.evento.findUnique({
      where: { id: idEvento },
    });

    if (!evento) {
      return NextResponse.json(
        { error: "Evento não encontrado." },
        { status: 404 }
      );
    }

    // Verificar se o voluntário existe
    const voluntario = await prisma.voluntario.findUnique({
      where: { id: idVoluntario },
    });

    if (!voluntario) {
      return NextResponse.json(
        { error: "Voluntário não encontrado." },
        { status: 404 }
      );
    }

    const updateEvento = await prisma.evento.update({
      where: {
        id: idEvento,
      },
      data: {
        inscritos: {
          connect: { id: idVoluntario },
        },
      },
    });

    return NextResponse.json(
      {
        message: "Voluntário adicionado ao evento com sucesso.",
        updateEvento,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao consultar eventos e voluntários:", error);
    return NextResponse.json(
      { error: "Erro ao consultar eventos e voluntários." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
