import { authOptions } from "@/app/api/auth/[...nextauth]/handler";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";

export async function verifyLogin() {
  const loginUser = await getServerSession(authOptions);
  if (!loginUser) {
    redirect("/");
  }
  const prisma = new PrismaClient();
  const user = await prisma.voluntario.findUnique({
    where: {
      email: String(loginUser.user?.email),
    },
  });

  const eventosDoVoluntario = await prisma.voluntario.findUnique({
    where: { id: user?.id },
    select: {
      eventos: {
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
    eventosCadastrados: eventosDoVoluntario!.eventos,
  };
}
