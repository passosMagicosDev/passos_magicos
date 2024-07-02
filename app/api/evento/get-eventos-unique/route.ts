import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  const cache = request.nextUrl.searchParams.get("cache");

  if (!id) {
    return NextResponse.json({ error: "id é obrigatório" }, { status: 400 });
  }

  try {
    let eventosCriados;

    if (cache) {
      const cacheArray = JSON.parse(cache);
      eventosCriados = cacheArray.filter(
        (el: { criadorId: number }) => el.criadorId === Number(id)
      );
    }

    if (!cache || eventosCriados.length === 0) {
      eventosCriados = await prisma.evento.findMany({
        where: {
          criadorId: Number(id),
        },
      });
    }

    return NextResponse.json({ eventosCriados });
  } catch (error) {
    console.error("Erro ao obter eventos criados:", error);
    return NextResponse.json(
      { error: "Erro ao obter eventos criados" },
      { status: 500 }
    );
  }
}
