"use client";
import React, { useEffect, useState } from "react";
import CardsVoluntariados from "@/components/meus-voluntariados";
import { notifyError } from "@/utils/notify";
import { useDataUser } from "@/context/UserDataContext";
import { EventoCadastrado } from "@/types/types";
import LoadingForms from "../loading";

function RenderCardsMeusVoluntariados() {
  const { id } = useDataUser();
  const [data, setData] = useState<EventoCadastrado[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        setLoading(true);
        const cachedEventos = sessionStorage.getItem(`eventosCache_${id}`);
        if (cachedEventos) {
          const data = JSON.parse(cachedEventos);
          setData(data);
          setLoading(false);
          return;
        }

        const response = await fetch(
          `/api/evento/get-eventos-inscritos?idVoluntario=${id}`
        );
        if (!response.ok) {
          notifyError("Falha ao buscar eventos");
          setLoading(false);
          return;
        }

        const data = await response.json();
        if (data && data.length > 0) {
          setData(data);
          sessionStorage.setItem(`eventosCache_${id}`, JSON.stringify(data));
        }
      } catch (error) {
        notifyError("Erro ao buscar eventos");
      } finally {
        setLoading(false);
      }
    };

    fetchEventos();
  }, [id]);

  if (loading) {
    return <LoadingForms />;
  }

  console.log(data);
  return (
    <>
      <h1 className="text-xl text-[#333] p-5 bg-[#F2F2F2] w-full">
        Meus Voluntariados
      </h1>
      <div className="p-5">
        {data.length === 0 ? (
          <p>Você não está inscrito em nenhum evento.</p>
        ) : (
          data.map((evento) => (
            <React.Fragment key={evento.idEvento}>
              <CardsVoluntariados
                id={evento.idEvento}
                nomeEvento={String(evento.nomeEvento)}
                descricaoEvento={evento.descricaoEvento}
                dataEvento={evento.dataEvento}
                horaInicio={evento.horaInicio}
                horaFim={evento.horaFim}
                quantidadeDePessoas={Number(evento.quantidadeDePessoas)}
              />
            </React.Fragment>
          ))
        )}
      </div>
    </>
  );
}

export default RenderCardsMeusVoluntariados;
