import { authOptions } from "@/app/api/auth/[...nextauth]/handler";
import { prismaClient } from "@/prisma/prismaClient";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export async function verifyLogin() {
  console.log("ENTREI VERIFY");
  const loginUser = await getServerSession(authOptions);
  if (!loginUser) {
    redirect("/");
  }
  const user = await prismaClient.voluntario.findUnique({
    where: {
      email: String(loginUser.user?.email),
    },
  });

  const eventosDoVoluntario = await prismaClient.voluntario.findUnique({
    where: { id: user?.id },
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

  return {
    email: user?.email,
    areaAtuacao: user?.areaAtuacao,
    admin: user?.admin,
    nome: user?.nome,
    id: user?.id,
    eventosCadastrados: eventosDoVoluntario!.eventosCriados,
    eventosInscritos: eventosDoVoluntario!.eventosInscritos,
  };
}
