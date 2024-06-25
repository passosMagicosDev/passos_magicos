import Navbar from "@/components/navbar";
import React from "react";

import { redirect } from "next/navigation";

import { verifyLogin } from "@/hooks/verifyLogin";
import { PrismaClient } from "@prisma/client";
import ControlerEventos from "@/components/eventosCadastrados/controlerEventos";

const prisma = new PrismaClient();

async function getEventosCriadosPeloVoluntario(voluntarioId: number) {
  const eventos = await prisma.evento.findMany({
    where: {
      criadorId: voluntarioId,
    },
    include: {
      inscritos: true,
    },
  });
  return eventos;
}

async function CadastrarEvento() {
  const { admin, id } = await verifyLogin();

  if (!admin) redirect("/app");
  const data = await getEventosCriadosPeloVoluntario(Number(id));
  return (
    <main className="flex min-h-screen">
      <Navbar />
      <div className="flex flex-col flex-1">
        <div className="">
          <h1 className="text-xl text-[#333] p-5 bg-[#F2F2F2] w-full">
            Meus Eventos Cadastrados
          </h1>
        </div>
        <ControlerEventos evento={data} />
      </div>
    </main>
  );
}

export default CadastrarEvento;
