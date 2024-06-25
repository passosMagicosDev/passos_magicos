import Navbar from "@/components/navbar";
import { verifyLogin } from "@/hooks/verifyLogin";
import React from "react";
import { PrismaClient } from "@prisma/client";
import CardsVoluntariados from "@/components/meus-voluntariados";

const prisma = new PrismaClient();

async function getEventosInscrito(voluntarioId: number) {
  try {
    const eventosInscritos = await prisma.eventoToVoluntario.findMany({
      where: {
        voluntarioId: voluntarioId,
      },
      include: {
        evento: true, // Inclui os dados do evento relacionado
      },
    });

    return eventosInscritos.map((inscricao) => inscricao.evento);
  } catch (error) {
    console.error("Erro ao obter eventos inscritos:", error);
    throw new Error("Erro ao obter eventos inscritos");
  }
}

async function MeusVoluntariados() {
  const { id } = await verifyLogin();
  const data = await getEventosInscrito(Number(id));

  console.log(data);
  return (
    <main className="flex min-h-screen">
      <Navbar />
      <div className="flex-1">
        <h1 className="text-xl text-[#333] p-5 bg-[#F2F2F2] w-full">
          Meus Voluntariados
        </h1>
        <div className="p-5">
          {data.length === 0 ? (
            <p>Você não está inscrito em nenhum evento.</p>
          ) : (
            data.map((evento) => (
              <React.Fragment key={evento.id}>
                <CardsVoluntariados
                  id={evento.id}
                  nomeEvento={evento.nomeEvento}
                  descricaoEvento={evento.descricaoEvento}
                  dataEvento={evento.dataEvento}
                  horaFim={evento.horaFim}
                  horaInicio={evento.horaInicio}
                  quantidadeDePessoas={evento.quantidadeDePessoas}
                />
              </React.Fragment>
            ))
          )}
        </div>
      </div>
    </main>
  );
}

export default MeusVoluntariados;
