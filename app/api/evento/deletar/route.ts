import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  console.log("DELETAR");

  const { id } = await request.json();

  if (!id) {
    return NextResponse.json({ error: "Necessário ID" }, { status: 400 });
  }

  try {
    const data = await prisma.evento.delete({
      where: {
        id: Number(id),
      },
    });
    return NextResponse.json({
      message: "Evento deletado com sucesso",
      idDeletado: data.id,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao deletar evento" },
      { status: 500 }
    );
  }
}
