import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  console.log("GET EVENTOS INSCRITOS");

  const idVoluntario = request.nextUrl.searchParams.get("idVoluntario");

  if (!idVoluntario) {
    return NextResponse.json(
      { error: "idVoluntario é obrigatório" },
      { status: 400 }
    );
  }

  try {
    const eventosInscritos = await prisma.eventoToVoluntario.findMany({
      where: {
        voluntarioId: Number(idVoluntario),
      },
      include: {
        evento: true,
      },
    });

    console.log("ENTREII", eventosInscritos);
    return NextResponse.json(
      eventosInscritos.map((inscricao) => inscricao.evento)
    );
  } catch (error) {
    console.error("Erro ao obter eventos inscritos:", error);
    return NextResponse.json(
      { error: "Erro ao obter eventos inscritos" },
      { status: 500 }
    );
  }
}
