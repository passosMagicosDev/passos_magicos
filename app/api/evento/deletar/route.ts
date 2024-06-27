import { prismaClient } from "@/prisma/prismaClient";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  const { id } = await request.json();

  if (!id) {
    return NextResponse.json({ error: "Necessário ID" }, { status: 400 });
  }

  try {
    await prismaClient.evento.delete({
      where: {
        id: Number(id),
      },
    });
    return NextResponse.json({ message: "Evento deletado com sucesso" });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao deletar evento" },
      { status: 500 }
    );
  }
}
