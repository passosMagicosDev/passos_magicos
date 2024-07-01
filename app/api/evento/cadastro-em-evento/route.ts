import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  console.log("CADASTRO EM EVENTO");

  try {
    const { idEvento, idVoluntario } = await request.json();

    if (!idEvento || !idVoluntario) {
      return NextResponse.json(
        { error: "idEvento e idVoluntario são obrigatórios." },
        { status: 400 }
      );
    }

    const evento = await prisma.evento.findUnique({
      where: { id: idEvento },
    });

    if (!evento) {
      return NextResponse.json(
        { error: "Evento não encontrado." },
        { status: 404 }
      );
    }

    const voluntario = await prisma.voluntario.findUnique({
      where: { id: idVoluntario },
    });

    if (!voluntario) {
      return NextResponse.json(
        { error: "Voluntário não encontrado." },
        { status: 404 }
      );
    }

    const inscricao = await prisma.eventoToVoluntario.create({
      data: {
        eventoId: idEvento,
        voluntarioId: idVoluntario,
        email: voluntario.email,
        nome: voluntario.nome,
        telefone: voluntario.telefone,
      },
    });

    return NextResponse.json(
      {
        message: "Voluntário adicionado ao evento com sucesso.",
        inscricao,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao adicionar voluntário ao evento:", error);
    return NextResponse.json(
      { error: "Erro ao adicionar voluntário ao evento." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
