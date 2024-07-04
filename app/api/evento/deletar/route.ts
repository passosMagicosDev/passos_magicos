import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  console.log("DELETAR");

  const { id } = await request.json();

  if (!id) {
    return NextResponse.json({ error: "Necessário ID" }, { status: 400 });
  }

  try {
    const deletedEvento = await prisma.$transaction(async (prisma) => {
      await prisma.eventoToVoluntario.deleteMany({
        where: {
          eventoId: Number(id),
        },
      });

      const evento = await prisma.evento.delete({
        where: {
          id: Number(id),
        },
      });

      return evento;
    });

    return NextResponse.json({
      message: "Evento deletado com sucesso",
      idDeletado: deletedEvento.id,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Erro ao deletar evento" },
      { status: 500 }
    );
  }
}
