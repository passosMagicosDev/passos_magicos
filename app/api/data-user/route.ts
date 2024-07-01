import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const emailUser = request.nextUrl.searchParams.get("email");

  try {
    if (!emailUser) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await prisma.voluntario.findUnique({
      where: {
        email: String(emailUser),
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const eventosDoVoluntario = await prisma.voluntario.findUnique({
      where: { id: user.id },
      select: {
        eventosInscritos: {
          select: {
            id: true,
            eventoId: true,
          },
        },
        eventosCriados: {
          select: {
            id: true,
          },
        },
      },
    });

    return NextResponse.json({
      email: user.email,
      areaAtuacao: user.areaAtuacao,
      admin: user.admin,
      nome: user.nome,
      id: user.id,
      eventosCadastrados: eventosDoVoluntario?.eventosCriados || [],
      eventosInscritos: eventosDoVoluntario?.eventosInscritos || [],
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
